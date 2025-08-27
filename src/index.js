import "./styles.css";
import { createTask } from "./task";
import { defaultList, createList } from "./list";

export const lists = [defaultList];
export const currentList = defaultList;

const dialog = document.querySelector(`dialog`);
// dialog.showModal();
