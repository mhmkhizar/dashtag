import * as Helper from "../helper";
import * as TaskListItem from "./task-list-item";

export function addItem(task) {
  const list = document.querySelector(`#task-list`);
  const listItem = TaskListItem.generate(task);
  list.appendChild(listItem);
  TaskListItem.init();
}

export function generate() {
  const listUl = Helper.createElement({
    element: `ul`,
    classes: `mx-auto max-w-[96ch] rounded-lg bg-[var(--card)] text-[var(--card-foreground)]`,
    id: `task-list`,
  });
  return listUl;
}
