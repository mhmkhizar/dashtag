export function createTask(
  title,
  description = ``,
  dueDate = null,
  priority = null
) {
  if (!title || typeof title !== `string` || title.trim() === ``) return;

  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    completed: false,
    toggleCompleted() {
      this.completed = !this.completed;
    },
  };
}
