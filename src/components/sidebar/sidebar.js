import { Element } from "../../utils/helper";
import * as ProjectService from "../../services/project-service";
import * as ProjectView from "../project-view/project-view";

const list = Element.select(`#sidebar-list`);
const defaultItem = ProjectService.getDefault();
let activeItem;

export function init() {
  renderList();
  setActiveItem();
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
  const item = Element.select(`[data-projectid="${defaultItem.id}"]`, list);
  if (item) item.classList.add(`active-item`);
  activeItem = item;
  renderActiveItem();
}

function switchActiveItem(nextItem) {
  activeItem.classList.remove(`active-item`);
  activeItem = nextItem;
  activeItem.classList.add(`active-item`);
  renderActiveItem();
}

function renderActiveItem() {
  ProjectView.render(activeItem.dataset.projectid);
}

function removeItem(id) {
  const item = list.querySelector(`[data-projectid="${id}"]`);
  item.remove();
}

export function addItem(project) {
  const listItem = Element.create({
    element: `li`,
    className: `sidebar-list-item flex cursor-pointer items-center gap-2 rounded-[var(--radius)] px-4 py-0.5 hover:bg-current/10`,
    attributes: { "data-projectid": `${project.id}` },
  });
  const hashIcon = Element.create({
    element: `span`,
    className: `icon material-symbols-rounded icon-wght-300`,
    textContent: `tag`,
  });
  const itemText = Element.create({
    element: `span`,
    className: `truncate`,
    textContent: project.name,
  });
  const closeIcon = Element.create({
    element: `span`,
    className: `icon delete-project-button material-symbols-rounded ml-auto !text-xl custom-hidden`,
    attributes: { inert: `` },
    textContent: `close`,
  });
  listItem.append(hashIcon, itemText, closeIcon);
  list.appendChild(listItem);
}

function handleItemHover(e, isVisible) {
  if (!e.target.classList.contains(`sidebar-list-item`)) return;
  const item = e.target;
  if (item.dataset.projectid === defaultItem.id) return;
  const closeIcon = Element.select(`span:last-of-type`, item);
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
  const isDeleteBtn = e.target.id === `deleteProjectBtn`;
  const isActiveItem = e.target.closest(`li`).classList.contains(`active`);
  if (!hasAnyItemClass || isDeleteBtn || isActiveItem) return;
  const item = e.target.closest(`li`);
  switchActiveItem(item);
}
