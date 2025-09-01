import { Element } from "../../utils/helper";
import * as ProjectService from "../../services/project-service";

const list = Element.select(`#sidebar-list`);
const defaultItem = ProjectService.getDefault();
let activeItem;

export function init() {
  render();
  list.addEventListener(`mouseenter`, (e) => handleItemHover(e, true), true);
  list.addEventListener(`mouseleave`, (e) => handleItemHover(e, false), true);
  list.addEventListener(`click`, (e) => handleCloseIconClick(e));
  list.addEventListener(`click`, (e) => toggleActiveItem(e));
}

function render() {
  list.innerHTML = ``;
  ProjectService.getAll().forEach(addItem);
}

function removeItem(id) {
  const item = list.querySelector(`[data-projectid="${id}"]`);
  item.remove();
}

export function addItem(project) {
  const listItem = Element.create({
    element: `li`,
    className: `sidebar__list-item`,
    attributes: { "data-projectid": `${project.id}` },
  });
  const listIcon = Element.create({
    element: `span`,
    className: `sidebar__list-item-icon icon material-symbols-rounded`,
    textContent: `list`,
  });
  const itemText = Element.create({
    element: `span`,
    className: `sidebar__list-item-text`,
    textContent: project.name,
  });
  const closeIcon = Element.create({
    element: `span`,
    className: `sidebar__list-item-icon icon material-symbols-rounded hidden`,
    id: `deleteProjectBtn`,
    attributes: { inert: `` },
    textContent: `close`,
  });
  if (project.id === defaultItem.id) setActiveItem(listItem);
  listItem.append(listIcon, itemText, closeIcon);
  list.appendChild(listItem);
}

function handleItemHover(e, visible) {
  if (!e.target.classList.contains(`sidebar__list-item`)) return;
  const item = e.target;
  if (item.dataset.projectid === defaultItem.id) return;
  const closeIcon = Element.select(`.icon:last-of-type`, item);
  if (visible) {
    closeIcon.classList.remove(`hidden`);
    closeIcon.removeAttribute(`inert`);
  } else {
    closeIcon.setAttribute(`inert`, ``);
    closeIcon.classList.add(`hidden`);
  }
}

function handleCloseIconClick(e) {
  if (e.target.id !== `deleteProjectBtn`) return;
  const closeIcon = e.target;
  const item = closeIcon.closest(`li`);
  const itemProjectID = item.dataset.projectid;
  const isRemove = ProjectService.remove(itemProjectID);
  if (!isRemove) return;
  if (item === activeItem) {
    const previousItem = item.previousElementSibling;
    const nextItem = item.nextElementSibling;
    nextItem ? setActiveItem(nextItem) : setActiveItem(previousItem);
  }
  removeItem(`${itemProjectID}`);
}

function toggleActiveItem(e) {
  const itemClasses = [
    `sidebar__list-item`,
    `sidebar__list-item-icon`,
    `sidebar__list-item-text`,
  ];
  const hasAnyItemClass = itemClasses.some((cls) =>
    e.target.classList.contains(cls)
  );
  const isDeleteBtn = e.target.id === `deleteProjectBtn`;
  const isActiveItem = e.target.closest(`li`).classList.contains(`active`);
  if (!hasAnyItemClass || isDeleteBtn || isActiveItem) return;
  const item = e.target.closest(`li`);
  activeItem.classList.remove(`active`);
  activeItem = item;
  item.classList.add(`active`);
}

function setActiveItem(item) {
  activeItem = item;
  activeItem.classList.add(`active`);
}
