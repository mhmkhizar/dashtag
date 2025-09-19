import { format } from "date-fns";
import * as Helper from "../helper";
import * as TaskService from "../../logic/task-service";

export function init() {
  const taskList = document.querySelector(`#task-list`);
  taskList.addEventListener(`mouseenter`, (e) => handleHover(e, true), true);
  taskList.addEventListener(`mouseleave`, (e) => handleHover(e, false), true);
  taskList.addEventListener(`click`, (e) => handleDeleteIconClick(e));
}

export function generate(item) {
  const itemLi = generateItemLi(item);
  const checkIconSpan = generateCheckIconSpan();
  const containerDiv = generateContainerDiv();
  const titleSpan = generateTitleSpan(item);
  containerDiv.appendChild(titleSpan);
  if (item.description) {
    const descriptionSpan = generatedDescriptionSpan(item);
    containerDiv.appendChild(descriptionSpan);
  }
  if (item.dueDate !== null) {
    const dateSpan = generateDateSpan(item);
    containerDiv.appendChild(dateSpan);
  }
  const deleteIconSpan = generateDeleteIconSpan();
  const starIconSpan = generateStarIconSpan(item);
  itemLi.append(checkIconSpan, containerDiv, deleteIconSpan, starIconSpan);
  return itemLi;
}

function handleHover(e, show) {
  if (e.target.id !== `task-item`) return;
  const item = e.target;
  const deleteIcon = item.querySelector(`#delete-task-btn`);
  const starIcon = item.querySelector(`#task-star-icon`);
  if (show) {
    deleteIcon.classList.remove(`custom-hidden`);
    if (starIcon.dataset.id === `off`)
      starIcon.classList.remove(`custom-hidden`);
  } else {
    deleteIcon.classList.add(`custom-hidden`);
    if (starIcon.dataset.id === `off`) starIcon.classList.add(`custom-hidden`);
  }
}

function handleDeleteIconClick(e) {
  if (e.target.id !== `delete-task-btn`) return;
  if (e.cancelBubble) return;
  e.cancelBubble = true;
  const deleteIcon = e.target;
  const item = deleteIcon.closest(`li`);
  const itemTaskID = item.dataset.taskid;
  const isRemove = TaskService.remove(itemTaskID);
  if (!isRemove) return;
}

function generateItemLi(item) {
  return Helper.createElement({
    element: `li`,
    classes: `flex w-full items-start gap-4 py-3 px-6 transition-colors hover:bg-current/10`,
    id: `task-item`,
    attributes: { "data-taskid": `${item.id}` },
  });
}

function generateCheckIconSpan() {
  return Helper.createElement({
    element: `span`,
    classes: `icon material-symbols-rounded icon-wght-200 w-[1.5rem] h-[1.5rem] -scale-80 cursor-pointer`,
    textContent: `check_box_outline_blank`,
  });
}

function generateContainerDiv() {
  return Helper.createElement({
    element: `div`,
    classes: `flex w-[calc(100%-7.5rem)] flex-col items-start`,
  });
}

function generateTitleSpan(item) {
  return Helper.createElement({
    element: `span`,
    classes: `w-full truncate`,
    textContent: `${item.title}`,
  });
}

function generatedDescriptionSpan(item) {
  return Helper.createElement({
    element: `span`,
    classes: `text-sm text-[var(--muted-foreground)] mb-1 w-full truncate`,
    textContent: `${item.description}`,
  });
}

function generateDateSpan(item) {
  return Helper.createElement({
    element: `span`,
    classes: `w-fit rounded-[var(--radius)] border border-current/35 px-2 py-0.5 text-sm text-current/85`,
    textContent: `${format(item.dueDate, `dd-MMMM-yyy`)}`,
  });
}

function generateDeleteIconSpan() {
  return Helper.createElement({
    element: `span`,
    classes: `icon material-symbols-rounded icon-wght-200 custom-hidden w-[1.5rem] h-[1.5rem] cursor-pointer`,
    textContent: `delete`,
    id: `delete-task-btn`,
  });
}

function generateStarIconSpan(item) {
  return Helper.createElement({
    element: `span`,
    classes: item.starred
      ? `icon material-symbols-rounded w-[1.5rem] h-[1.5rem] icon-fill text-[var(--primary)]`
      : `icon material-symbols-rounded w-[1.5rem] h-[1.5rem] custom-hidden icon-wght-200`,
    textContent: `star`,
    id: `task-star-icon`,
    attributes: { "data-id": item.starred ? `on` : `off` },
  });
}
