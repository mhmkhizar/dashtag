import "./styles.css";
import { createTask } from "./task";
import { defaultList, createList } from "./list";
import { displayProjectTitles } from "./dom";

const lists = [defaultList];
const currentList = defaultList;

displayProjectTitles(lists);
