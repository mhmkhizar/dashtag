import * as Project from "./project";
import * as Storage from "./storage";

const _projects = [];
const _defaultProject = {};
const _starredTasksProject = {};
const _completedTasksProject = {};

export function init() {
  loadFromStorage();
}

function loadFromStorage() {
  const storedProjects = Storage.retrieve();
  _projects.splice(0, _projects.length, ...storedProjects);
  loadDefaultProject(storedProjects);
}

function loadDefaultProject(projects) {
  if (projects) Object.assign(_defaultProject, projects[0]);
  else Object.assign(_defaultProject, setDefault());
}

function setDefault() {
  const project = add("My Tasks");
  return project;
}

export function getDefault() {
  return _defaultProject;
}

export function get(id) {
  const project = _projects.find((p) => p.id === id);
  return project;
}

export function getAll() {
  return _projects;
}

export function add(title) {
  const project = Project.create({ title: title });
  _projects.push(project);
  updateLocalStorage();
  return project;
}

export function remove(id) {
  if (id === _defaultProject.id) return false;
  const index = _projects.findIndex((p) => p.id === id);
  if (index === -1) return;
  _projects.splice(index, 1);
  updateLocalStorage();
  return true;
}

export function updateLocalStorage() {
  Storage.save(_projects);
}
