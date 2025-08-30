import { createProject } from "./project";
export { ProjectService };

const _defaultProject = createProject("My Tasks");
const _projects = [_defaultProject];

const ProjectService = (() => {
  const getAll = () => {
    return _projects.map((p) => ({ ...p }));
  };

  const getDefault = () => {
    return { ..._defaultProject };
  };

  const add = (name) => {
    const project = createProject(name);
    if (!project) return;
    _projects.push(project);
    return { ...project };
  };

  const remove = (id) => {
    if (id === _defaultProject.id) return false;
    const index = _projects.findIndex((p) => p.id === id);
    if (index === -1) return;
    _projects.splice(index, 1);
    return true;
  };

  return { getAll, getDefault, add, remove };
})();
