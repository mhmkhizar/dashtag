import { format } from "date-fns";
import * as Task from "../../logic/task";
import * as TaskService from "../../logic/task-service";
import * as TaskListItem from "../project-section/task-list-item";

const dialog = document.querySelector(`#edit-task-dialog`);
const form = dialog.querySelector(`#edit-task-form`);
const titleInput = document.querySelector(`#edit-task-title-input`);
const starInput = document.querySelector(`#edit-task-star-input`);
const descInput = document.querySelector(`#edit-task-desc-input`);
const dateInput = document.querySelector(`#edit-task-date-input`);
const dateLabel = document.querySelector(`#edit-task-date-label`);
const closeBtn = form.querySelector(`#close-edit-task-dialog`);
const submitBtn = form.querySelector(`#submit-edit-task-form`);

let currentTask;
let currentItem;

export function init(item) {
  openDialog();
  addEventListeners();

  currentTask = TaskService.get(item.dataset.taskid);
  currentItem = item;

  if (currentTask.title) {
    titleInput.value = currentTask.title;
  }
  if (currentTask.description) {
    descInput.value = currentTask.description;
  }
  if (currentTask.dueDate) {
    const dateObj = new Date(currentTask.dueDate);
    const formattedDate = dateObj.toISOString().split("T")[0];
    dateInput.value = formattedDate;
    updateDateLabel();
  }
  if (currentTask.starred) {
    starInput.checked = true;
  }
}

function addEventListeners() {
  titleInput.addEventListener(`input`, toggleSubmitBtn);
  dateInput.addEventListener(`input`, updateDateLabel);
  closeBtn.addEventListener(`click`, closeDialog);
  dialog.addEventListener(`close`, handleDialogClose);
}

function openDialog() {
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
  console.log(starred);

  const editedTask = Task.create({
    id: currentTask.id,
    title: title,
    starred: starred,
    description: description,
    dueDate: dueDate,
    completed: currentTask.completed,
  });
  updateTaskItem(editedTask);
  TaskService.update(currentTask.id, editedTask);
}

function updateTaskItem(updatedTask) {
  const infoContainerDiv = currentItem.querySelector(`#task-info-container`);
  const starIconSpan = currentItem.querySelector(`#task-star-icon`);

  infoContainerDiv.innerHTML = ``;
  if (updatedTask.title) {
    const titleSpan = TaskListItem.generateTitleSpan(updatedTask);
    infoContainerDiv.appendChild(titleSpan);
  }
  if (updatedTask.description) {
    const descSpan = TaskListItem.generateDescriptionSpan(updatedTask);
    infoContainerDiv.appendChild(descSpan);
  }
  if (updatedTask.dueDate) {
    const dateSpan = TaskListItem.generateDateSpan(updateTaskItem);
    infoContainerDiv.appendChild(dateSpan);
  }
  const updatedStarIconSpan = TaskListItem.generateStarIconSpan(updatedTask);
  starIconSpan.replaceWith(updatedStarIconSpan);
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
