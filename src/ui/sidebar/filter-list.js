import * as ProjectService from "../../logic/project-service";
import * as FilterListItem from "./filter-list-item";

const list = document.querySelector(`#sidebar-filters-list`);

let starredItem;
let completedItem;

export function init() {
  starredItem = ProjectService.getStarredTasksProject();
  completedItem = ProjectService.getCompletedTasksProject();
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
