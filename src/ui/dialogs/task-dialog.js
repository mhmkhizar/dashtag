import { format } from "date-fns";
import * as Task from "../../logic/task";
import * as TaskList from "../project-section/task-list";
import * as ProjectList from "../sidebar/project-list";
import * as TaskService from "../../logic/task-service";
import * as ProjectService from "../../logic/project-service";

const dialog = document.querySelector(`#task-dialog`);
const form = dialog.querySelector(`#task-form`);
const titleInput = document.querySelector(`#task-title-input`);
const starInput = document.querySelector(`#task-star-input`);
const descInput = document.querySelector(`#task-desc-input`);
const dateInput = document.querySelector(`#task-date-input`);
const dateLabel = document.querySelector(`#task-date-label`);
const closeBtn = form.querySelector(`#close-task-dialog`);
const submitBtn = form.querySelector(`#submit-task-form`);

function init() {
  updateDateLabel();
  submitBtn.setAttribute(`inert`, ``);
  titleInput.addEventListener(`input`, toggleSubmitBtn);
  dateInput.addEventListener(`input`, updateDateLabel);
  closeBtn.addEventListener(`click`, closeDialog);
  dialog.addEventListener(`close`, handleDialogClose);
}

export function openDialog() {
  init();
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

function toggleSubmitBtn() {
  if (titleInput.value.trim().length > 0) {
    submitBtn.removeAttribute(`inert`);
  } else {
    submitBtn.setAttribute(`inert`, ``);
  }
}

function handleDialogClose() {
  if (dialog.returnValue === `save`) submitForm();
  form.reset();
  dialog.returnValue = ``;
}

function submitForm() {
  const title = titleInput.value.trim();
  const starred = starInput.checked;
  const description = descInput.value.trim();
  let dueDate = dateInput.value;
  dueDate ? (dueDate = new Date(dateInput.value)) : (dueDate = null);

  const task = Task.create({
    title: title,
    starred: starred,
    description: description,
    dueDate: dueDate,
  });

  const currentProjectID = ProjectList.getActiveItem().dataset.id;
  const currentProject = ProjectService.get(currentProjectID);
  TaskService.add({ task: task, projectID: currentProject.id });
  TaskList.addItem(task);
}

function updateDateLabel() {
  if (!dateInput.value) return renderDateLabel(`—— / ———— / ————`, true);
  const formattedDate = format(new Date(dateInput.value), `dd/MMMM/yyyy`);
  renderDateLabel(formattedDate, false);
}

function renderDateLabel(text, muted) {
  dateLabel.textContent = text;
  if (muted) dateLabel.classList.add(`text-[var(--muted-foreground)]`);
  else dateLabel.classList.remove(`text-[var(--muted-foreground)]`);
}
