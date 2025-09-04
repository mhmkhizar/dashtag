export function create({ id = crypto.randomUUID(), title }) {
  if (!title || title.trim() === ``) return;
  return {
    id,
    title: title.trim().toString(),
    tasks: [],
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(taskID) {
      this.tasks = this.tasks.filter((task) => task.id !== taskID);
    },
  };
}
