import * as Helper from "../helper";
import * as ProjectService from "../../logic/project-service";
import * as ProjectList from "./project-list";
import * as Sidebar from "./sidebar";

export function handleHover(e, isVisible) {
  if (!e.target.classList.contains(`project-list-item`)) return;
  const item = e.target;
  if (item.dataset.projectid === `default-project`) return;
  const closeIcon = item.querySelector(`span:last-of-type`);
  if (isVisible) {
    closeIcon.removeAttribute(`inert`);
    closeIcon.classList.remove(`custom-hidden`);
  } else {
    closeIcon.setAttribute(`inert`, ``);
    closeIcon.classList.add(`custom-hidden`);
  }
}

export function handleCloseIconClick(e) {
  if (e.target.id !== `delete-project-btn`) return;
  const closeIcon = e.target;
  const item = closeIcon.closest(`li`);
  const itemProjectID = item.dataset.projectid;
  const isRemoved = ProjectService.remove(itemProjectID);
  if (!isRemoved) return;
  if (item === Sidebar.getActiveItem()) {
    const beforeItem = item.previousElementSibling;
    const afterItem = item.nextElementSibling;
    afterItem
      ? Sidebar.switchActiveItem(afterItem)
      : Sidebar.switchActiveItem(beforeItem);
  }
  ProjectList.removeItem(itemProjectID);
}

export function generate(item) {
  const itemLi = Helper.createElement({
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
    classes: `icon project-item-icon material-symbols-rounded ml-auto !text-xl custom-hidden`,
    attributes: { inert: `` },
    textContent: `close`,
    id: `delete-project-btn`,
  });

  itemLi.append(hashIconSpan, textSpan, closeIconSpan);
  return itemLi;
}
