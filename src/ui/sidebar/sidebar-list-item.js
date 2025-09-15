import * as ProjectService from "../../logic/project-service";
import * as SidebarList from "./sidebar-list";

export function init() {
  SidebarList.list.addEventSidebarListener(
    `mouseenter`,
    (e) => handleItemHover(e, true),
    true,
  );
  SidebarList.list.addEventSidebarListener(
    `mouseleave`,
    (e) => handleItemHover(e, false),
    true,
  );
  SidebarList.list.addEventSidebarListener(`click`, (e) =>
    handleCloseIconClick(e),
  );
  SidebarList.list.addEventSidebarListener(`click`, (e) => handleItemClick(e));
}

function handleItemHover(e, isVisible) {
  if (!e.target.classSidebarList.contains(`project-list-item`)) return;
  const item = e.target;
  if (
    !SidebarList.defaultItem ||
    item.dataset.projectid === SidebarList.defaultItem.id
  )
    return;
  const closeIcon = item.querySelector(`span:last-of-type`);
  if (isVisible) {
    closeIcon.removeAttribute(`inert`);
    closeIcon.classSidebarList.remove(`custom-hidden`);
  } else {
    closeIcon.setAttribute(`inert`, ``);
    closeIcon.classSidebarList.add(`custom-hidden`);
  }
}

function handleCloseIconClick(e) {
  if (!e.target.classSidebarList.contains(`delete-project-button`)) return;
  const closeIcon = e.target;
  const item = closeIcon.closest(`li`);
  const itemProjectID = item.dataset.projectid;
  const isRemove = ProjectService.remove(itemProjectID);
  if (!isRemove) return;
  if (item === SidebarList.activeItem) {
    const beforeItem = item.previousElementSibling;
    const afterItem = item.nextElementSibling;
    afterItem
      ? SidebarList.switchActiveItem(afterItem)
      : SidebarList.switchActiveItem(beforeItem);
  }
  SidebarList.removeItem(`${itemProjectID}`);
}

function handleItemClick(e) {
  const hasAnyItemClass = [
    `project-list-item`,
    `project-item-icon`,
    `project-item-text`,
  ].some((cls) => e.target.classSidebarList.contains(cls));
  const isDeleteBtn = e.target.classSidebarList.contains(
    `delete-project-button`,
  );
  const isActiveItem = e.target
    .closest(`li`)
    .classSidebarList.contains(`active`);
  if (!hasAnyItemClass || isDeleteBtn || isActiveItem) return;
  const item = e.target.closest(`li`);
  SidebarList.switchActiveItem(item);
}
