import { format } from "date-fns";
import * as Helper from "../helper";
import * as TaskService from "../../logic/task-service";
import * as EditTaskDialog from "../dialogs/edit-task-dialog";

export function generate(item) {
  const itemLi = generateItemLi(item);
  if (item.completed) {
    itemLi.inert = true;
    itemLi.classList.add(`opacity-75`);
  }
  const checkIconSpan = generateCheckIconSpan(item);
  const infoContainerDiv = generateInfoContainerDiv();
  const titleSpan = generateTitleSpan(item);
  infoContainerDiv.appendChild(titleSpan);
  if (item.description) {
    const descriptionSpan = generatedDescriptionSpan(item);
    infoContainerDiv.appendChild(descriptionSpan);
  }
  if (item.dueDate) {
    const dateSpan = generateDateSpan(item);
    infoContainerDiv.appendChild(dateSpan);
  }
  const deleteIconSpan = generateDeleteIconSpan();
  const starIconSpan = generateStarIconSpan(item);
  itemLi.append(checkIconSpan, infoContainerDiv, deleteIconSpan, starIconSpan);
  return itemLi;
}

export function handleClick(e) {
  const targetedElemsIDs = [
    `task-item`,
    `task-info-container`,
    `task-title`,
    `task-desc`,
    `task-duedate`,
    `task-star-icon`,
  ];
  if (!targetedElemsIDs.includes(e.target.id)) return;
  const item = e.target.closest(`li`);
  EditTaskDialog.init(item);
}

export function handleHover(e, show) {
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

export function handleCheckIconClick(e) {
  if (e.target.id !== `check-task-btn`) return;
  const checkIcon = e.target;
  const item = checkIcon.closest(`li`);
  const itemID = item.dataset.taskid;
  TaskService.markComplete(itemID);
}

export function handleDeleteIconClick(e) {
  if (e.target.id !== `delete-task-btn`) return;
  if (e.cancelBubble) return;
  e.cancelBubble = true;
  const deleteIcon = e.target;
  const item = deleteIcon.closest(`li`);
  const itemTaskID = item.dataset.taskid;
  TaskService.remove(itemTaskID);
}

function generateItemLi(item) {
  return Helper.createElement({
    element: `li`,
    classes: `flex w-full items-start gap-4 py-3 px-6 transition-colors hover:bg-current/10`,
    id: `task-item`,
    attributes: { "data-taskid": `${item.id}` },
  });
}

function generateCheckIconSpan(item) {
  return Helper.createElement({
    element: `span`,
    classes: item.completed
      ? `icon material-symbols-rounded icon-fill text-[var(--primary)] w-[1.5rem] h-[1.5rem] cursor-pointer -scale-80 -rotate-180`
      : `icon material-symbols-rounded icon-wght-200 w-[1.5rem] h-[1.5rem] -scale-80 cursor-pointer`,
    textContent: item.completed ? `check_box` : `check_box_outline_blank`,
    id: `check-task-btn`,
  });
}

function generateInfoContainerDiv() {
  return Helper.createElement({
    element: `div`,
    classes: `flex w-[calc(100%-7.5rem)] flex-col items-start`,
    id: `task-info-container`,
  });
}

function generateTitleSpan(item) {
  return Helper.createElement({
    element: `span`,
    classes: `w-full truncate mb-0.5`,
    textContent: `${item.title}`,
    id: `task-title`,
  });
}

function generatedDescriptionSpan(item) {
  return Helper.createElement({
    element: `span`,
    classes: `text-sm text-[var(--muted-foreground)] w-full truncate mb-1.5`,
    textContent: `${item.description}`,
    id: `task-desc`,
  });
}

function generateDateSpan(item) {
  return Helper.createElement({
    element: `span`,
    classes: `w-fit rounded-[var(--radius)] border border-current/35 px-2 py-0.5 text-sm text-current/85`,
    textContent: `${format(item.dueDate, `dd-MMMM-yyy`)}`,
    id: `task-duedate`,
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
