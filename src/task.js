export { createTask };

function createTask(
  title = ``,
  description = ``,
  dueDate = null,
  priority = null
) {
  if (!title || title.trim() === ``) return;

  return {
    id: crypto.randomUUID(),
    title: title.trim().toString(),
    description,
    dueDate,
    priority,
    completed: false,
    toggleCompleted() {
      this.completed = !this.completed;
    },
  };
}
