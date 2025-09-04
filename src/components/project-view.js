import * as Helper from "./utils/helper";
import * as ProjectServie from "../services/project-service";

const titleContainer = document.querySelector(`#title-container`);
const tasksContainer = document.querySelector(`#tasks-section`);

export function render(projectID) {
  titleContainer.innerHTML = ``;
  tasksContainer.innerHTML = ``;

  const project = ProjectServie.get(projectID);

  const title = Helper.element.create({
    element: `h2`,
    classes: `border-l border-[var(--border)] px-4 text-lg truncate`,
    textContent: `${project.name}`,
    id: `projectTitle`,
  });
  titleContainer.appendChild(title);

  const addTaskBtn = Helper.element.create({
    element: `button`,
    classes: `button button-outline mb-6 w-full justify-center px-4 py-2`,
    attributes: { type: `button` },
  });
  const addTaskIcon = Helper.element.create({
    element: `span`,
    classes: `material-symbols-rounded icon-wght-300`,
    textContent: `add_task`,
  });
  const addTaskText = Helper.element.create({
    element: `span`,
    textContent: `Add a task`,
  });
  addTaskBtn.append(addTaskIcon, addTaskText);
  tasksContainer.append(addTaskBtn);

  const titleTooltip = Helper.element.create({
    element: `div`,
    classes: `absolute z-50 hidden px-3 py-1 text-sm text-white bg-gray-800 rounded-lg shadow-lg max-w-[75ch] whitespace-normal break-words`,
    id: `tooltip`,
  });
  titleContainer.appendChild(titleTooltip);

  const titleD = document.querySelector(`#projectTitle`);
  const tool = document.querySelector(`#tooltip`);
  titleD.addEventListener("mouseenter", (e) => {
    tool.textContent = `${titleD.textContent}`;
    tool.classList.remove("hidden");

    tool.style.left = e.pageX + 10 + "px";
    tool.style.top = e.pageY + 10 + "px";
  });

  titleD.addEventListener("mousemove", (e) => {
    tool.style.left = e.pageX + 10 + "px";
    tool.style.top = e.pageY + 10 + "px";
  });

  titleD.addEventListener("mouseleave", () => {
    tool.classList.add("hidden");
  });
}
