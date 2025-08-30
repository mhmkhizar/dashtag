export function createTask(title, description, dueDate, priority) {
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
