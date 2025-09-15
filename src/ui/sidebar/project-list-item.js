import * as ProjectService from "../../logic/project-service";
import * as ProjectList from "./project-list";

export function init() {
  ProjectList.list.addEventListener(
    `mouseenter`,
    (e) => handleItemHover(e, true),
    true,
  );
  ProjectList.list.addEventListener(
    `mouseleave`,
    (e) => handleItemHover(e, false),
    true,
  );
  ProjectList.list.addEventListener(`click`, (e) => handleCloseIconClick(e));
  ProjectList.list.addEventListener(`click`, (e) => handleItemClick(e));
}

function handleItemHover(e, isVisible) {
  if (!e.target.classList.contains(`project-list-item`)) return;
  const item = e.target;
  if (
    !ProjectList.defaultItem ||
    item.dataset.projectid === ProjectList.defaultItem.id
  )
    return;
  const closeIcon = item.querySelector(`span:last-of-type`);
  if (isVisible) {
    closeIcon.removeAttribute(`inert`);
    closeIcon.classList.remove(`custom-hidden`);
  } else {
    closeIcon.setAttribute(`inert`, ``);
    closeIcon.classList.add(`custom-hidden`);
  }
}

function handleCloseIconClick(e) {
  if (!e.target.classList.contains(`delete-project-button`)) return;
  const closeIcon = e.target;
  const item = closeIcon.closest(`li`);
  const itemProjectID = item.dataset.projectid;
  const isRemove = ProjectService.remove(itemProjectID);
  if (!isRemove) return;
  if (item === ProjectList.activeItem) {
    const beforeItem = item.previousElementSibling;
    const afterItem = item.nextElementSibling;
    afterItem
      ? ProjectList.switchActiveItem(afterItem)
      : ProjectList.switchActiveItem(beforeItem);
  }
  ProjectList.removeItem(`${itemProjectID}`);
}

function handleItemClick(e) {
  const hasAnyItemClass = [
    `project-list-item`,
    `project-item-icon`,
    `project-item-text`,
  ].some((cls) => e.target.classList.contains(cls));
  const isDeleteBtn = e.target.classList.contains(`delete-project-button`);
  const isActiveItem = e.target.closest(`li`).classList.contains(`active`);
  if (!hasAnyItemClass || isDeleteBtn || isActiveItem) return;
  const item = e.target.closest(`li`);
  ProjectList.switchActiveItem(item);
}
