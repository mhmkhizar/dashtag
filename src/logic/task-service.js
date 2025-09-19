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

export function remove(taskID) {
  const projects = ProjectService.getAll();
  projects.forEach((project) => project.removeTask(taskID));
  TaskList.removeItem(taskID);
  ProjectService.updateLocalStorage();
  return true;
}

export function removeAll(projectID) {
  const project = ProjectService.get(projectID);
  project.tasks = [];
  TaskList.removeAllItem();
}

export function markComplete(taskID) {
  const projects = ProjectService.getAll();
  const completedTasksProject = ProjectService.get(`completed-tasks-project`);
  projects.forEach((project) => {
    const task = project.tasks.find((task) => task.id === taskID);
    if (!task) return;
    task.markComplete();
    if (!hasTask(completedTasksProject, task.id))
      completedTasksProject.addTask(task);
    if (project.id !== completedTasksProject.id) project.removeTask(task.id);
  });
  TaskList.removeItem(taskID);
  ProjectService.updateLocalStorage();
}

function hasTask(project, taskID) {
  return project.tasks.some((task) => task.id === taskID);
}
