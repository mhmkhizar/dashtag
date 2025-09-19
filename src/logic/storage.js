import * as Project from "./project";
import * as Task from "./task";

export function save(projectsArray) {
  if (!projectsArray) return;
  localStorage.setItem(`projects`, JSON.stringify(projectsArray));
}

export function retrieve() {
  const rawProjects = JSON.parse(localStorage.getItem(`projects`));
  if (!rawProjects) return;

  const projects = rawProjects.map((p) => {
    const project = Project.create({ id: p.id, title: p.title });
    if (p.tasks) {
      p.tasks.forEach((t) => {
        const task = Task.create({
          id: t.id,
          title: t.title,
          description: t.description,
          dueDate: t.dueDate,
          starred: t.starred,
          completed: t.completed,
        });
        project.addTask(task);
      });
    }
    return project;
  });

  return projects;
}
