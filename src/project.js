export { getUserProjects, addProject, deleteProject };

const _defaultProject = createProject(`My Tasks`);
const _userProjects = [_defaultProject];

function getUserProjects() {
  return [..._userProjects];
}

function deleteProject(id) {
  if (!id) return;
  const index = _userProjects.findIndex((p) => p.id === id);
  if (index === -1) return;
  _userProjects.splice(index, 1);
}

function addProject(project) {
  if (!project) return;
  _userProjects.push(project);
}

function createProject(name) {
  if (!name || name.trim() === ``) return;
  return {
    id: crypto.randomUUID(),
    name: name.trim().toString(),
    tasks: [],
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(taskID) {
      this.tasks = this.tasks.filter((task) => task.id !== taskID);
    },
  };
}
