import * as ProjectService from "../../logic/project-service";
import * as FilterListItem from "./filter-list-item";

const list = document.querySelector(`#sidebar-filters-list`);

let starredItem;
let completedItem;

export function init() {
  starredItem = ProjectService.get(`starred-tasks-project`);
  completedItem = ProjectService.get(`completed-tasks-project`);
  render();
}

function render() {
  list.innerHTML = ``;
  ProjectService.getAll().forEach((p) => {
    if (p.id !== `starred-tasks-project` && p.id !== `completed-tasks-project`)
      return;
    addItem(p);
  });
}

function addItem(project) {
  const item = FilterListItem.generate(project);
  list.appendChild(item);
}
