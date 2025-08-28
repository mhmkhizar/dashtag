export const defaultList = createList(`My Tasks`);

export function createList(name) {
  if (!name || typeof name !== `string` || name.trim() === ``) return;

  return {
    id: crypto.randomUUID(),
    name,
    tasks: [],
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask(taskID) {
      this.tasks = this.tasks.filter((task) => task.id !== taskID);
    },
  };
}
