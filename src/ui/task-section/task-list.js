import * as TaskListItem from "./task-list-item";

const list = document.querySelector(`#project-section-task-list`);

export function addItem(task) {
  const listItem = TaskListItem.generate(task);
  list.appendChild(listItem);
}
