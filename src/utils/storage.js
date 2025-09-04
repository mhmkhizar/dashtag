export function save(projectsArray) {
  if (!projectsArray) return;
  localStorage.setItem(`projects`, JSON.stringify(projectsArray));
}

export function retrieve() {
  const projects = localStorage.getItem(`projects`);
  if (!projects) return;
  return JSON.parse(projects);
}
