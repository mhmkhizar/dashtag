import * as ProjectService from "./project-service";
import * as TaskList from "../ui/project-section/task-list";

export function add({ task, projectID }) {
  const project = ProjectService.get(projectID);
  project.addTask(task);
  TaskList.addItem(task);
  if (task.starred) {
    const starredProject = ProjectService.get(`starred-tasks-project`);
    starredProject.addTask(task);
  }
  ProjectService.updateLocalStorage();
}

export function remove(taskId) {
  const projects = ProjectService.getAll();
  projects.forEach((project) => project.removeTask(taskId));
  TaskList.removeItem(taskId);
  ProjectService.updateLocalStorage();
  return true;
}
