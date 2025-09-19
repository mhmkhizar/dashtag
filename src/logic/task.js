export function create({
  id = crypto.randomUUID(),
  title,
  description,
  dueDate,
  starred = false,
  completed = false,
}) {
  if (!title || title.trim() === ``) return;
  return {
    id,
    title: title.trim().toString(),
    description,
    dueDate,
    starred,
    completed,
    markComplete() {
      this.completed = true;
    },
  };
}
