import { format } from "date-fns";
import * as Helper from "../helper";

export function init() {
  const taskList = document.querySelector(`#task-list`);
  taskList.addEventListener(`mouseenter`, (e) => handleHover(e, true), true);
  taskList.addEventListener(`mouseleave`, (e) => handleHover(e, false), true);
}

export function generate(item) {
  const itemLi = Helper.createElement({
    element: `li`,
    classes: `flex w-full items-start gap-4 py-3 px-6 transition-colors hover:bg-current/10`,
    id: `task-item`,
  });
  const starCheckInput = Helper.createElement({
    element: `input`,
    classes: `mt-[0.4rem]`,
    attributes: { type: `checkbox` },
  });
  const titleAndDateDiv = Helper.createElement({
    element: `div`,
    classes: `flex w-[calc(100%-2rem)] flex-col items-start gap-1`,
  });
  const titleSpan = Helper.createElement({
    element: `span`,
    classes: `w-full truncate`,
    textContent: `${item.title}`,
  });
  const dateSpan = Helper.createElement({
    element: `span`,
    classes: `${generateDateSpanClasses(item)}`,
    textContent: `${generateDateSpanText(item)}`,
  });
  const deleteIconSpan = Helper.createElement({
    element: `span`,
    classes: `icon material-symbols-rounded icon-wght-200 custom-hidden`,
    textContent: `delete`,
    id: `delete-task-btn`,
  });
  const starIconSpan = Helper.createElement({
    element: `span`,
    classes: `${generateStarIconClasses(item)}`,
    textContent: `star`,
    id: `task-star-icon`,
  });

  titleAndDateDiv.append(titleSpan, dateSpan);
  itemLi.append(starCheckInput, titleAndDateDiv, deleteIconSpan, starIconSpan);
  return itemLi;
}

function handleHover(e, show) {
  if (e.target.id !== `task-item`) return;
  const item = e.target;
  const deleteIcon = item.querySelector(`#delete-task-btn`);
  const starIcon = item.querySelector(`#task-star-icon`);
  if (show) {
    deleteIcon.classList.remove(`custom-hidden`);
    starIcon.classList.remove(`custom-hidden`);
  } else {
    deleteIcon.classList.add(`custom-hidden`);
    starIcon.classList.add(`custom-hidden`);
  }
}

function generateDateSpanClasses(item) {
  let classes = `w-fit rounded-[var(--radius)] border border-current/35 px-2 py-0.5 text-sm text-current/85`;
  const arr = classes.split(` `);
  if (item.dueDate === null) {
    arr.push(`opacity-25`);
    classes = arr.join(` `);
  }
  return classes;
}

function generateDateSpanText(item) {
  if (item.dueDate === null) return `—— / ———— / ————`;
  return format(item.dueDate, `dd-MMMM-yyy`);
}

function generateStarIconClasses(item) {
  let classes = `icon material-symbols-rounded icon-wght-200 custom-hidden`;
  let arr = classes.split(` `);
  if (item.starred) {
    arr = arr.filter(
      (item) => item !== `custom-hidden` && item !== `icon-wght-200`,
    );
    arr.push(`icon-fill text-[var(--primary)]`);
    classes = arr.join(` `);
  }
  return classes;
}
