import * as Helper from "../helper";
import * as ProjectService from "../../logic/project-service";
import * as ProjectSection from "../project-section";
import * as SidebarListItem from "./sidebar-list-item";

export const list = document.querySelector(`#sidebar-project-list`);
export let defaultItem;
export let activeItem;

export function init() {
  defaultItem = ProjectService.getDefault();
  render();
  setActiveItem();
  SidebarListItem.init();
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
  ProjectSection.init(activeItem.dataset.projectid);
}

export function switchActiveItem(nextItem) {
  activeItem.classList.remove(`active-item`);
  activeItem = nextItem;
  activeItem.classList.add(`active-item`);
  ProjectSection.init(activeItem.dataset.projectid);
}

export function removeItem(id) {
  const item = list.querySelector(`[data-projectid="${id}"]`);
  item.remove();
}

export function addItem(project) {
  const listItem = generateListItem(project);
  list.appendChild(listItem);
}

function generateListItem(item) {
  const li = Helper.createElement({
    element: `li`,
    classes: `project-list-item flex cursor-pointer items-center gap-2 rounded-[var(--radius)] px-4 h-8 hover:bg-current/10`,
    attributes: { "data-projectid": `${item.id}` },
  });
  const hashIconSpan = Helper.createElement({
    element: `span`,
    classes: `icon project-item-icon material-symbols-rounded icon-wght-300`,
    textContent: `tag`,
  });
  const textSpan = Helper.createElement({
    element: `span`,
    classes: `project-item-text truncate`,
    textContent: item.title,
  });
  const closeIconSpan = Helper.createElement({
    element: `span`,
    classes: `icon project-item-icon delete-project-button material-symbols-rounded ml-auto !text-xl custom-hidden`,
    attributes: { inert: `` },
    textContent: `close`,
  });
  li.append(hashIconSpan, textSpan, closeIconSpan);
  return li;
}
