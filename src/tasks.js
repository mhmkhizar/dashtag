export function createTask(title, description, dueDate, priority) {
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
