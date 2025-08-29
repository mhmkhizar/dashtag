export { getUserProjects, addProject };

const _defaultProject = createProject(`My Tasks`);
const _userProjects = [_defaultProject];

function getUserProjects() {
  return [..._userProjects];
}

function addProject(newProject) {
  const project = createProject(newProject);
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
