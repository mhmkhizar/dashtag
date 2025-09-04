import * as Helper from "./utils/helper";
import * as ProjectService from "../services/project-service";
import * as ProjectView from "./project-view";

const list = document.querySelector(`#sidebar-list`);
let defaultItem;
let activeItem;

export function init() {
  defaultItem = ProjectService.getDefault();
  renderList();
  setActiveItem();
  activateEvents();
}

function activateEvents() {
  list.addEventListener(`mouseenter`, (e) => handleItemHover(e, true), true);
  list.addEventListener(`mouseleave`, (e) => handleItemHover(e, false), true);
  list.addEventListener(`click`, (e) => handleCloseIconClick(e));
  list.addEventListener(`click`, (e) => handleItemClick(e));
}

function renderList() {
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

function switchActiveItem(nextItem) {
  activeItem.classList.remove(`active-item`);
  activeItem = nextItem;
  activeItem.classList.add(`active-item`);
  ProjectView.render(activeItem.dataset.projectid);
}

function removeItem(id) {
  const item = list.querySelector(`[data-projectid="${id}"]`);
  item.remove();
}

export function addItem(project) {
  const listItem = Helper.element.create({
    element: `li`,
    classes: `sidebar-list-item flex cursor-pointer items-center gap-2 rounded-[var(--radius)] px-4 py-0.5 hover:bg-current/10`,
    attributes: { "data-projectid": `${project.id}` },
  });
  const hashIcon = Helper.element.create({
    element: `span`,
    classes: `icon sidebar-list-item-icon material-symbols-rounded icon-wght-300`,
    textContent: `tag`,
  });
  const itemText = Helper.element.create({
    element: `span`,
    classes: `sidebar-list-item-text truncate`,
    textContent: project.title,
  });
  const closeIcon = Helper.element.create({
    element: `span`,
    classes: `icon sidebar-list-item-icon delete-project-button material-symbols-rounded ml-auto !text-xl custom-hidden`,
    attributes: { inert: `` },
    textContent: `close`,
  });

  listItem.append(hashIcon, itemText, closeIcon);
  list.appendChild(listItem);
}

function handleItemHover(e, isVisible) {
  if (!e.target.classList.contains(`sidebar-list-item`)) return;
  const item = e.target;
  if (!defaultItem || item.dataset.projectid === defaultItem.id) return;
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
  if (item === activeItem) {
    const beforeItem = item.previousElementSibling;
    const afterItem = item.nextElementSibling;
    afterItem ? switchActiveItem(afterItem) : switchActiveItem(beforeItem);
  }
  removeItem(`${itemProjectID}`);
}

function handleItemClick(e) {
  const itemClasses = [
    `sidebar-list-item`,
    `sidebar-list-item-icon`,
    `sidebar-list-item-text`,
  ];
  const hasAnyItemClass = itemClasses.some((cls) =>
    e.target.classList.contains(cls),
  );
  const isDeleteBtn = e.target.classList.contains(`delete-project-button`);
  const isActiveItem = e.target.closest(`li`).classList.contains(`active`);
  if (!hasAnyItemClass || isDeleteBtn || isActiveItem) return;
  const item = e.target.closest(`li`);
  switchActiveItem(item);
}
