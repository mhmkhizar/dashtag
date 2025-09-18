import { format } from "date-fns";
import * as Helper from "../helper";
import * as TaskService from "../../logic/task-service";
import * as TaskList from "./task-list";
import * as ProjectService from "../../logic/project-service";
import * as ProjectList from "../sidebar/project-list";

export function init() {
  const taskList = document.querySelector(`#task-list`);
  taskList.addEventListener(`mouseenter`, (e) => handleHover(e, true), true);
  taskList.addEventListener(`mouseleave`, (e) => handleHover(e, false), true);
  taskList.addEventListener(`click`, (e) => handleDeleteIconClick(e));
}

export function generate(item) {
  const itemLi = Helper.createElement({
    element: `li`,
    classes: `flex w-full items-start gap-4 py-3 px-6 transition-colors hover:bg-current/10`,
    id: `task-item`,
    attributes: { "data-taskid": `${item.id}` },
  });
  const checkIconSpan = Helper.createElement({
    element: `span`,
    classes: `icon material-symbols-rounded icon-wght-200 w-[1.5rem] h-[1.5rem] -scale-80 cursor-pointer`,
    textContent: `check_box_outline_blank`,
  });
  const containerDiv = Helper.createElement({
    element: `div`,
    classes: `flex w-[calc(100%-7.5rem)] flex-col items-start`,
  });
  const titleSpan = Helper.createElement({
    element: `span`,
    classes: `w-full truncate`,
    textContent: `${item.title}`,
  });
  containerDiv.appendChild(titleSpan);
  if (item.description) {
    const descSpan = Helper.createElement({
      element: `span`,
      classes: `text-sm text-[var(--muted-foreground)] mb-1 w-full truncate`,
      textContent: `${item.description}`,
    });
    containerDiv.appendChild(descSpan);
  }
  if (item.dueDate !== null) {
    const dateSpan = Helper.createElement({
      element: `span`,
      classes: `w-fit rounded-[var(--radius)] border border-current/35 px-2 py-0.5 text-sm text-current/85`,
      textContent: `${format(item.dueDate, `dd-MMMM-yyy`)}`,
    });
    containerDiv.appendChild(dateSpan);
  }
  const deleteIconSpan = Helper.createElement({
    element: `span`,
    classes: `icon material-symbols-rounded icon-wght-200 custom-hidden w-[1.5rem] h-[1.5rem] cursor-pointer`,
    textContent: `delete`,
    id: `delete-task-btn`,
  });
  const starIconSpan = Helper.createElement({
    element: `span`,
    classes: `${generateStarIconClasses(item)}`,
    textContent: `star`,
    id: `task-star-icon`,
    attributes: { "data-id": `${generateStarIconDataID(item)}` },
  });

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
  const currentProject = ProjectService.get(
    ProjectList.getActiveItem().dataset.projectid,
  );
  const isRemove = TaskService.remove({
    taskID: itemTaskID,
    projectID: currentProject.id,
  });
  if (!isRemove) return;
  TaskList.removeItem(itemTaskID);
}

function generateStarIconClasses(item) {
  let classes = `icon material-symbols-rounded icon-wght-200 custom-hidden w-[1.5rem] h-[1.5rem]`;
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

function generateStarIconDataID(item) {
  if (item.starred) return `on`;
  else return `off`;
}
