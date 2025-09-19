import * as Project from "./project";
import * as Storage from "./storage";
import * as ProjectList from "../ui/sidebar/project-list";

const _projects = [];
const _defaultProject = {};
const _starredTasksProject = {};
const _completedTasksProject = {};

export function init() {
  loadFromStorage();
}

function loadFromStorage() {
  const storedProjects = Storage.retrieve();

  if (storedProjects) {
    // load all projects
    _projects.splice(0, _projects.length, ...storedProjects);
    // load default-project
    Object.assign(
      _defaultProject,
      storedProjects.find((p) => p.id === `default-project`),
    );
    console.log(_projects);
  } else {
    // set dafault-project
    Object.assign(_defaultProject, setDefaultProject());
    // set starred-tasks-project
    Object.assign(_starredTasksProject, setStarredTasksProject());
    // set completed-tasks-project
    Object.assign(_completedTasksProject, setCompletedTasksProject());
  }
}

function setDefaultProject() {
  const project = add({ title: `My Tasks`, id: `default-project` });
  return project;
}

function setStarredTasksProject() {
  const project = add({ title: `Starred`, id: `starred-tasks-project` });
  return project;
}

function setCompletedTasksProject() {
  const project = add({ title: `Completed`, id: `completed-tasks-project` });
  return project;
}

export function get(id) {
  const project = _projects.find((p) => p.id === id);
  return project;
}

export function getAll() {
  return _projects;
}

export function add({ title, id }) {
  const project = Project.create({ title: title, id: id });
  _projects.push(project);
  ProjectList.addItem(project);
  updateLocalStorage();
  return project;
}

export function remove(id) {
  const notRemovableProjectIDs = [
    _defaultProject.id,
    _starredTasksProject.id,
    _completedTasksProject.id,
  ];
  if (notRemovableProjectIDs.includes(id)) return false;
  const index = _projects.findIndex((p) => p.id === id);
  if (index === -1) return;
  _projects.splice(index, 1);
  updateLocalStorage();
  return true;
}

export function updateLocalStorage() {
  Storage.save(_projects);
}
