import * as ProjectService from "../../logic/project-service";
import * as ProjectSection from "../project-section/project-section";
import * as ProjectListItem from "./project-list-item";
import * as TaskList from "../project-section/task-list";

const list = document.querySelector(`#sidebar-project-list`);

let activeItem;
let defaultItem;

export function get() {
  return list;
}

export function getDefaultItem() {
  return defaultItem;
}

export function getActiveItem() {
  return activeItem;
}

export function init() {
  defaultItem = ProjectService.getDefaultProject();
  render();
  setActiveItem();
  ProjectListItem.init();
}

function render() {
  list.innerHTML = ``;
  ProjectService.getAll().forEach((p) => {
    if (p.id === `starred-tasks-project` || p.id === `completed-tasks-project`)
      return;
    addItem(p);
  });
}

function setActiveItem() {
  if (!defaultItem) return;
  const item = list.querySelector(`[data-projectid="${defaultItem.id}"]`);
  if (item) item.classList.add(`active-item`);
  activeItem = item;
  ProjectSection.init(activeItem.dataset.projectid);
  TaskList.init();
}

export function switchActiveItem(nextItem) {
  activeItem.classList.remove(`active-item`);
  activeItem = nextItem;
  activeItem.classList.add(`active-item`);
  ProjectSection.init(activeItem.dataset.projectid);
  TaskList.init();
}

export function removeItem(id) {
  const item = list.querySelector(`[data-projectid="${id}"]`);
  item.remove();
}

export function addItem(project) {
  const item = ProjectListItem.generate(project);
  list.appendChild(item);
}
