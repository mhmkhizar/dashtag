import { Element } from "../../utils/helper";
import * as ProjectServie from "../../services/project-service";

const titleContainer = Element.select(`#title-container`);
const tasksSection = Element.select(`#tasks-section`);

export function render(projectID) {
  titleContainer.innerHTML = ``;
  tasksSection.innerHTML = ``;

  const project = ProjectServie.get(projectID);

  const title = Element.create({
    element: `h2`,
    className: `border-l border-[var(--border)] px-4 text-lg`,
    textContent: `${project.name}`,
  });
  titleContainer.appendChild(title);

  const addTaskBtn = Element.create({
    element: `button`,
    className: `button button-outline mb-6 w-full justify-center px-4 py-2`,
    attributes: { type: `button` },
  });
  const addTaskIcon = Element.create({
    element: `span`,
    className: `material-symbols-rounded icon-wght-300`,
    textContent: `add_task`,
  });
  const addTaskText = Element.create({
    element: `span`,
    textContent: `Add a task`,
  });
  addTaskBtn.append(addTaskIcon, addTaskText);
  tasksSection.append(addTaskBtn);
}
