export function createProject(id = crypto.randomUUID(), name) {
  if (!name || name.trim() === ``) return;
  return {
    id,
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
