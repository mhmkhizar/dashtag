import * as Helper from "../helper";
import * as ProjectServie from "../../logic/project-service";
import * as TaskDialog from "../dialogs/task-dialog";
import * as TaskList from "./task-list";

const section = document.querySelector(`#project-section`);

export function init(projectid) {
  render(projectid);
  TaskList.init();
  const openTaskDialog = document.querySelector(`#open-task-dialog`);
  openTaskDialog.addEventListener(`click`, TaskDialog.openDialog);
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
    textContent:
      project.title !== `Starred` && project.title !== `Completed`
        ? `${project.title}`
        : `${project.title} Tasks`,
  });
  return h2;
}

function generateAddTaskBtn(project) {
  const button = Helper.createElement({
    element: `button`,
    classes: `button button-outline button-sm w-full justify-center`,
    attributes: { type: `button` },
    id: `open-task-dialog`,
  });
  const iconSpan = Helper.createElement({
    element: `span`,
    classes: `material-symbols-rounded icon-wght-300`,
    textContent: `add_task`,
  });
  const textSpan = Helper.createElement({
    element: `span`,
    textContent: `Add a task`,
  });
  button.append(iconSpan, textSpan);
  if (
    project.id === `starred-tasks-project` ||
    project.id === `completed-tasks-project`
  ) {
    button.inert = true;
  }
  return button;
}

function generateTaskList() {
  const listUl = Helper.createElement({
    element: `ul`,
    classes: `mx-auto max-w-[96ch] rounded-lg bg-[var(--card)] text-[var(--card-foreground)]`,
    id: `task-list`,
  });
  return listUl;
}
