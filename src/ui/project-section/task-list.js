import * as Helper from "../helper";
import * as ProjectService from "../../logic/project-service";
import * as TaskListItem from "./task-list-item";
import * as ProjectList from "../sidebar/project-list";

let list;

export function init() {
  list = document.querySelector(`#task-list`);
  render();
  TaskListItem.init();
}

function render() {
  list.innerHTML = ``;
  const currentProject = ProjectService.get(
    ProjectList.getActiveItem().dataset.projectid,
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

export function generate() {
  const listUl = Helper.createElement({
    element: `ul`,
    classes: `mx-auto max-w-[96ch] rounded-lg bg-[var(--card)] text-[var(--card-foreground)]`,
    id: `task-list`,
  });
  return listUl;
}
