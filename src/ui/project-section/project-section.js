import * as Helper from "../helper";
import * as ProjectServie from "../../logic/project-service";
import * as TaskDialog from "../dialogs/task-dialog";

const projectSection = document.querySelector(`#project-section`);

export function init(projectid) {
  render(projectid);

  const openTaskDialog = document.querySelector(`#open-task-dialog`);
  openTaskDialog.addEventListener(`click`, TaskDialog.openDialog);
  TaskDialog.init();
}

function render(projectid) {
  projectSection.innerHTML = ``;
  const project = ProjectServie.get(projectid);

  const title = generateTitle(project.title);
  const addTaskBtn = generateAddTaskBtn();
  projectSection.append(title, addTaskBtn);
}

function generateTitle(title) {
  const h2 = Helper.createElement({
    element: `h2`,
    classes: `truncate mb-2 text-lg`,
    textContent: `${title}`,
  });
  return h2;
}

function generateAddTaskBtn() {
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
  return button;
}
