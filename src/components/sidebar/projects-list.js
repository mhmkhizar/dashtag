import * as Helper from "../utils/helper";
import * as ProjectService from "../../services/project-service";
import * as ProjectView from "../project-view";
import * as ProjectListItem from "./projects-list-item";

export const list = document.querySelector(`#sidebar-project-list`);
export let defaultItem;
export let activeItem;

export function init() {
  defaultItem = ProjectService.getDefault();
  render();
  setActiveItem();
  ProjectListItem.init();
}

function render() {
  list.innerHTML = ``;
  ProjectService.getAll().forEach(addItem);
}

function setActiveItem() {
  if (!defaultItem) return;
  const item = list.querySelector(`[data-projectid="${defaultItem.id}"]`);
  if (item) item.classList.add(`active-item`);
  activeItem = item;
  ProjectView.render(activeItem.dataset.projectid);
}

export function switchActiveItem(nextItem) {
  activeItem.classList.remove(`active-item`);
  activeItem = nextItem;
  activeItem.classList.add(`active-item`);
  ProjectView.render(activeItem.dataset.projectid);
}

export function removeItem(id) {
  const item = list.querySelector(`[data-projectid="${id}"]`);
  item.remove();
}

export function addItem(project) {
  const listItem = Helper.element.create({
    element: `li`,
    classes: `project-list-item flex cursor-pointer items-center gap-2 rounded-[var(--radius)] px-4 h-8 hover:bg-current/10`,
    attributes: { "data-projectid": `${project.id}` },
  });
  const hashIcon = Helper.element.create({
    element: `span`,
    classes: `icon project-item-icon material-symbols-rounded icon-wght-300`,
    textContent: `tag`,
  });
  const itemText = Helper.element.create({
    element: `span`,
    classes: `project-item-text truncate`,
    textContent: project.title,
  });
  const closeIcon = Helper.element.create({
    element: `span`,
    classes: `icon project-item-icon delete-project-button material-symbols-rounded ml-auto !text-xl custom-hidden`,
    attributes: { inert: `` },
    textContent: `close`,
  });

  listItem.append(hashIcon, itemText, closeIcon);
  list.appendChild(listItem);
}
