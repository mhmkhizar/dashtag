import { Element } from "../../utils/helper";
import * as ProjectService from "../../services/project-service";

const list = Element.select(`#sidebar-list`);
const activeItem = ``;
// const activeItem = ProjectService.getDefault();

export function init() {
  render();
  list.addEventListener(`mouseenter`, (e) => handleItemHover(e, true), true);
  list.addEventListener(`mouseleave`, (e) => handleItemHover(e, false), true);
  list.addEventListener(`click`, (e) => handleCloseIconClick(e));

  list.addEventListener(`click`, (e) => {
    if (!e.target.classList.contains(`sidebar__list-item`)) return;
    const currentItem = e.target;
    const defaultItemID = ProjectService.getDefault().id;
    if (currentItem.dataset.projectid === defaultItemID) return;
    const closeIcon = Element.select(`.icon:last-of-type`, currentItem);
    if (visible) {
      closeIcon.classList.remove(`hidden`);
      closeIcon.removeAttribute(`inert`);
    } else {
      closeIcon.setAttribute(`inert`, ``);
      closeIcon.classList.add(`hidden`);
    }
  });
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
  listItem.append(listIcon, itemText, closeIcon);
  list.appendChild(listItem);
}

function handleItemHover(e, visible) {
  if (!e.target.classList.contains(`sidebar__list-item`)) return;
  const currentItem = e.target;
  const defaultItemID = ProjectService.getDefault().id;
  if (currentItem.dataset.projectid === defaultItemID) return;
  const closeIcon = Element.select(`.icon:last-of-type`, currentItem);
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
  const itemProjectID = closeIcon.closest(`li`).dataset.projectid;
  const isRemove = ProjectService.remove(itemProjectID);
  if (isRemove) removeItem(`${itemProjectID}`);
}
