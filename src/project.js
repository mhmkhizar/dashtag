export { projectsList, addProject, createProject };

const defaultProject = createProject(`My Tasks`);
const projectsList = [defaultProject];

function addProject(project) {
  projectsList.push(project);
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
