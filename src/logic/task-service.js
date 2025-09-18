import * as ProjectService from "./project-service";

export function add({ task, projectID }) {
  const project = ProjectService.get(projectID);
  project.addTask(task);
  ProjectService.updateLocalStorage();
}

export function remove({ taskID, projectID }) {
  const project = ProjectService.get(projectID);
  project.removeTask(taskID);
  ProjectService.updateLocalStorage();
}
