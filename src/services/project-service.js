import * as Project from "../models/project";
import * as Storage from "../utils/storage";

const _projects = [];
const _defaultProject = add("My Tasks");

export function getDefault() {
  return { ..._defaultProject };
}

export function get(id) {
  const project = _projects.find((p) => p.id === id);
  return { ...project };
}

export function getAll() {
  return _projects.map((p) => ({ ...p }));
}

export function add(name) {
  const project = Project.createProject(name);
  if (!project) return;
  _projects.push(project);
  console.log(_projects);
  Storage.save(_projects);
  return { ...project };
}

export function remove(id) {
  if (id === _defaultProject.id) return false;
  const index = _projects.findIndex((p) => p.id === id);
  if (index === -1) return;
  _projects.splice(index, 1);
  return true;
}
