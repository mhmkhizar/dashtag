import * as Helper from "../helper";
import * as ProjectServie from "../../logic/project-service";
import * as TaskDialog from "../dialogs/task-dialog";
import * as TaskList from "./task-list";
import * as TaskService from "../../logic/task-service";

const section = document.querySelector(`#project-section`);

export function init(projectid) {
  render(projectid);
  const mainBtn = document.querySelector(`#project-section-main-btn`);
  mainBtn.addEventListener(`click`, (e) => handleMainBtnClick(e));
  TaskList.init();
}

function render(projectid) {
  section.innerHTML = ``;
  const project = ProjectServie.get(projectid);

  const container = generateContainer({ classes: `px-6 mb-6` });
  const title = generateTitle(project);
  const addTaskBtn = generateAddTaskBtn(project);
  const taskList = generateTaskList();

  container.append(title, addTaskBtn);
  section.append(container, taskList);
}

function handleMainBtnClick(e) {
  const btnProjectID = e.target.closest(`button`).dataset.projectid;
  const filterProjectIds = [`starred-tasks-project`, `completed-tasks-project`];
  if (filterProjectIds.includes(btnProjectID)) {
    TaskService.removeAll(btnProjectID);
    return;
  }
  TaskDialog.openDialog();
}

function generateContainer({ classes }) {
  const div = Helper.createElement({
    element: `div`,
    classes: classes,
  });
  return div;
}

function generateTitle(project) {
  const h2 = Helper.createElement({
    element: `h2`,
    classes: `truncate mb-2 text-lg`,
    textContent: isFilterProject(project.id)
      ? `${project.title} Tasks`
      : `${project.title}`,
  });
  return h2;
}

function generateAddTaskBtn(project) {
  const button = Helper.createElement({
    element: `button`,
    classes: `button button-outline button-sm w-full justify-center`,
    attributes: { type: `button`, "data-projectid": `${project.id}` },
    id: `project-section-main-btn`,
  });
  const iconSpan = Helper.createElement({
    element: `span`,
    classes: `material-symbols-rounded icon-wght-300`,
    textContent: isFilterProject(project.id) ? `delete` : `add_task`,
  });
  const textSpan = Helper.createElement({
    element: `span`,
    textContent: isFilterProject(project.id) ? `Delete All` : `Add a task`,
  });
  button.append(iconSpan, textSpan);
  return button;
}

function generateTaskList() {
  const listUl = Helper.createElement({
    element: `ul`,
    classes: `mx-auto w-full bg-[var(--card)] text-[var(--card-foreground)] overflow-auto`,
    id: `task-list`,
  });
  return listUl;
}

function isFilterProject(id) {
  const filterProjectIds = [`starred-tasks-project`, `completed-tasks-project`];
  return filterProjectIds.includes(id);
}
