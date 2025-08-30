import * as Project from "../models/project";

const _defaultProject = Project.createProject("My Tasks");
const _projects = [_defaultProject];

export const getAll = () => {
  return _projects.map((p) => ({ ...p }));
};

export const getDefault = () => {
  return { ..._defaultProject };
};

export const add = (name) => {
  const project = Project.createProject(name);
  if (!project) return;
  _projects.push(project);
  return { ...project };
};

export const remove = (id) => {
  if (id === _defaultProject.id) return false;
  const index = _projects.findIndex((p) => p.id === id);
  if (index === -1) return;
  _projects.splice(index, 1);
  return true;
};
