import * as ProjectList from "./project-list";
import * as FilterList from "./filter-list";
import * as ProjectDialog from "../dialogs/project-dialog";
import * as ProjectSection from "../project-section/project-section";

let activeItem;

export function init() {
  const lists = document.querySelector(`#sidebar-lists`);
  const openProjectDialog = document.querySelector(`#open-project-dialog`);
  FilterList.init();
  ProjectList.init();
  lists.addEventListener(`click`, (e) => handleItemClick(e));
  openProjectDialog.addEventListener(`click`, ProjectDialog.openDialog);
}

export function setActiveItem(item) {
  activeItem = item;
}

export function getActiveItem() {
  return activeItem;
}

function handleItemClick(e) {
  const hasAnyItemClass = [
    `filter-list-item`,
    `filter-item-icon`,
    `filter-item-text`,
    `project-list-item`,
    `project-item-icon`,
    `project-item-text`,
  ].some((cls) => e.target.classList.contains(cls));
  const isDeleteBtn = e.target.id === `delete-project-btn`;
  const isActiveItem = e.target.closest(`li`).classList.contains(`active-item`);
  if (!hasAnyItemClass || isDeleteBtn || isActiveItem) return;
  const item = e.target.closest(`li`);
  switchActiveItem(item);
}

export function switchActiveItem(nextItem) {
  activeItem.classList.remove(`active-item`);
  activeItem = nextItem;
  activeItem.classList.add(`active-item`);
  ProjectSection.init(activeItem.dataset.projectid);
}
