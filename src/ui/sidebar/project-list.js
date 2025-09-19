import * as ProjectService from "../../logic/project-service";
import * as ProjectSection from "../project-section/project-section";
import * as ProjectListItem from "./project-list-item";
import * as TaskList from "../project-section/task-list";
import * as Sidebar from "./sidebar";

let list;
let defaultItem;

export function init() {
  list = document.querySelector(`#sidebar-project-list`);
  defaultItem = ProjectService.getDefaultProject();

  list.addEventListener(`click`, (e) =>
    ProjectListItem.handleCloseIconClick(e),
  );
  list.addEventListener(
    `mouseenter`,
    (e) => ProjectListItem.handleHover(e, true),
    true,
  );
  list.addEventListener(
    `mouseleave`,
    (e) => ProjectListItem.handleHover(e, false),
    true,
  );
  render();
  setDefaultAndActive();
}

export function get() {
  return list;
}

export function getDefaultItem() {
  return defaultItem;
}

function render() {
  list.innerHTML = ``;
  ProjectService.getAll().forEach((p) => {
    if (p.id === `starred-tasks-project` || p.id === `completed-tasks-project`)
      return;
    addItem(p);
  });
}

function setDefaultAndActive() {
  const item = list.querySelector(`[data-projectid="${defaultItem.id}"]`);
  if (item) item.classList.add(`active-item`);
  Sidebar.setActiveItem(item);
  ProjectSection.init(item.dataset.projectid);
}

export function removeItem(id) {
  const item = list.querySelector(`[data-projectid="${id}"]`);
  item.remove();
}

export function addItem(project) {
  const item = ProjectListItem.generate(project);
  list.appendChild(item);
}
