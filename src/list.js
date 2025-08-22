export const defaultList = createList(`My Tasks`);

export function createList(name) {
  return {
    id: crypto.randomUUID(),
    name,
    tasks: [],
    addTask(task) {
      this.tasks.push(task);
    },
    removeTask() {},
  };
}
