import * as Project from "./project";
import * as Storage from "./storage";

const _projects = [];
let _defaultProject;

export function init() {
  loadFromStorage();
}

function loadFromStorage() {
  const storedProjects = Storage.retrieve();
  if (storedProjects) {
    _projects.splice(0, _projects.length, ...storedProjects);
    _defaultProject = storedProjects[0];
  } else {
    _defaultProject = setDefault();
  }
}

function setDefault() {
  const project = add("My Tasks");
  Storage.save(_projects);
  return project;
}

export function getDefault() {
  return { ..._defaultProject };
}

export function get(id) {
  const project = _projects.find((p) => p.id === id);
  return project;
}

export function getCopy(id) {
  const project = _projects.find((p) => p.id === id);
  return { ...project };
}

export function getAll() {
  return _projects.map((p) => ({ ...p }));
}

export function add(name) {
  const project = Project.create({ title: name });
  _projects.push(project);
  Storage.save(_projects);
  return { ...project };
}

export function remove(id) {
  if (id === _defaultProject.id) return false;
  const index = _projects.findIndex((p) => p.id === id);
  if (index === -1) return;
  _projects.splice(index, 1);
  Storage.save(_projects);
  return true;
}
