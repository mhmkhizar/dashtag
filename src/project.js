export { getUserProjects, addProject, deleteProject };

const _defaultProject = createProject(`My Tasks`);
const _userProjects = [_defaultProject];

function getUserProjects() {
  return [..._userProjects];
}

function deleteProject(id) {
  const index = _userProjects.findIndex((project) => project.id === id);
  if (index !== -1) _userProjects.splice(index, 1);
}

function addProject(name) {
  _userProjects.push(createProject(name));
}

function createProject(name = ``) {
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
