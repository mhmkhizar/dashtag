import * as ProjectService from "../../logic/project-service";
import * as TaskListItem from "./task-list-item";
import * as Sidebar from "../sidebar/sidebar";

let list;

export function init() {
  list = document.querySelector(`#task-list`);
  addEventListeners(list);
  render();
}

function render() {
  list.innerHTML = ``;
  const currentProject = ProjectService.get(
    Sidebar.getActiveItem().dataset.projectid,
  );
  currentProject.tasks.forEach((task) => addItem(task));
}

export function addItem(task) {
  const listItem = TaskListItem.generate(task);
  list.appendChild(listItem);
}

export function removeItem(id) {
  const item = list.querySelector(`[data-taskid="${id}"]`);
  item.remove();
}

export function removeAllItem() {
  list.innerHTML = ``;
}

function addEventListeners(list) {
  list.addEventListener(
    `mouseenter`,
    (e) => TaskListItem.handleHover(e, true),
    true,
  );
  list.addEventListener(
    `mouseleave`,
    (e) => TaskListItem.handleHover(e, false),
    true,
  );
  list.addEventListener(`click`, (e) => TaskListItem.handleDeleteIconClick(e));
  list.addEventListener(`click`, (e) => TaskListItem.handleCheckIconClick(e));
}
