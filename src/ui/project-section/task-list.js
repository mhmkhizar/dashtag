import * as Helper from "../helper";
import * as ProjectService from "../../logic/project-service";
import * as TaskListItem from "./task-list-item";
import * as TaskService from "../../logic/task-service";
import * as ProjectList from "../sidebar/project-list";

export function init() {
  render();
}

function render() {
  const activeListItem = ProjectList.getActiveItem();
  const currentProject = ProjectService.get(activeListItem.dataset.projectid);
  currentProject.tasks.forEach((task) => addItem(task));
}

export function addItem(task) {
  const list = document.querySelector(`#task-list`);
  const listItem = TaskListItem.generate(task);
  list.appendChild(listItem);
}

export function removeItem(id) {
  const activeListItem = ProjectList.getActiveItem();
  const currentProject = ProjectService.get(activeListItem.dataset.projectid);
  TaskService.remove(id, currentProject.id);
}

export function generate() {
  const listUl = Helper.createElement({
    element: `ul`,
    classes: `mx-auto max-w-[96ch] rounded-lg bg-[var(--card)] text-[var(--card-foreground)]`,
    id: `task-list`,
  });
  return listUl;
}
