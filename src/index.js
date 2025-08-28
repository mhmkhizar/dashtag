import "./styles.css";
import { createTask } from "./task";
import { defaultProject, createProject } from "./list";
import { renderSidebarList } from "./dom";

const projects = [defaultProject];
const currentProject = defaultProject;

renderSidebarList(projects);
