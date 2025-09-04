export function create({
  id = crypto.randomUUID(),
  title,
  description,
  dueDate,
  priority,
}) {
  if (!title || title.trim() === ``) return;
  return {
    id,
    title: title.trim().toString(),
    description,
    dueDate,
    priority,
    completed: false,
    markComplete() {
      this.completed = true;
    },
  };
}
