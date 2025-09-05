import * as Helper from "./utils/helper";
import * as ProjectServie from "../services/project-service";

const projectSection = document.querySelector(`#project-section`);

export function render(projectid) {
  projectSection.innerHTML = ``;
  const project = ProjectServie.get(projectid);

  const title = generateTitle(project.title);
  const addTaskBtn = generateAddTaskBtn();
  projectSection.append(title, addTaskBtn);
}

function generateTitle(title) {
  const h2 = Helper.element.create({
    element: `h2`,
    classes: `truncate mb-2 text-lg`,
    textContent: `${title}`,
  });
  return h2;
}

function generateAddTaskBtn() {
  const button = Helper.element.create({
    element: `button`,
    classes: `button button-outline button-sm w-full justify-center`,
    attributes: { type: `button` },
  });
  const iconSpan = Helper.element.create({
    element: `span`,
    classes: `material-symbols-rounded icon-wght-300`,
    textContent: `add_task`,
  });
  const textSpan = Helper.element.create({
    element: `span`,
    textContent: `Add a task`,
  });
  button.append(iconSpan, textSpan);
  return button;
}
