import * as Helper from "../helper";
import * as ProjectList from "../sidebar/project-list";
import * as ProjectService from "../../logic/project-service";
import * as TaskListItem from "./task-list-item";
import * as TaskService from "../../logic/task-service";

export function init() {
  render();
}

function render() {
  const currentProject = ProjectService.get(
    ProjectList.getActiveItem().dataset.projectid,
  );
  currentProject.tasks.forEach((task) => addItem(task));
}

export function addItem(task) {
  const list = document.querySelector(`#task-list`);
  const listItem = TaskListItem.generate(task);
  list.appendChild(listItem);
  TaskListItem.init();
}

export function removeItem(id) {
  const currentProject = ProjectService.get(ProjectList.getActiveItem().id);
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
