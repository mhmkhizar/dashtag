import { Element } from "../../utils/helper";
import * as ProjectServie from "../../services/project-service";

const section = Element.select(`#project-view`);

export function render(projectID) {
  section.innerHTML = ``;
  const project = ProjectServie.get(projectID);
  const title = Element.create({
    element: `h2`,
    className: `project__title`,
    textContent: `${project.name}`,
  });
  const addTaskBtn = Element.create({
    element: `button`,
    className: `project__add-task-btn btn btn--primary-holo`,
    attributes: { type: `button` },
  });
  const addTaskIcon = Element.create({
    element: `span`,
    className: `project__add-task-icon icon material-symbols-rounded`,
    textContent: `add_task`,
  });
  const addTaskText = Element.create({
    element: `span`,
    className: `project__add-task-text`,
    textContent: `Add a task`,
  });

  addTaskBtn.append(addTaskIcon, addTaskText);
  section.append(title, addTaskBtn);
}
