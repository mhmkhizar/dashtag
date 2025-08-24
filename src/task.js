export function createTask(
  title,
  description = ``,
  dueDate = null,
  priority = null
) {
  if (!title || typeof title !== `string` || title.trim() === ``)
    throw new Error("Task title is required and must be a non-empty string");

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
