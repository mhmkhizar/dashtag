import * as Project from "../models/project";

export function save(projectsArray) {
  if (!projectsArray) return;
  localStorage.setItem(`projects`, JSON.stringify(projectsArray));
}

export function retrieve() {
  const rawProjects = JSON.parse(localStorage.getItem(`projects`));
  if (!rawProjects) return;
  const projects = rawProjects.map((p) =>
    Project.create({ title: p.title, id: p.id }),
  );
  return projects;
}
