import * as ProjectService from "../../logic/project-service";
import * as ProjectList from "../sidebar/project-list";

const dialog = document.querySelector(`#project-dialog`);
const form = dialog.querySelector(`#project-form`);
const titleInput = form.querySelector(`#project-title-input`);
const closeBtn = form.querySelector(`#close-project-dialog`);
const submitBtn = form.querySelector(`#submit-project-form`);

function init() {
  submitBtn.setAttribute(`inert`, ``);
  closeBtn.addEventListener(`click`, closeDialog);
  titleInput.addEventListener(`input`, toggleSubmitBtn);
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
  if (dialog.returnValue === `confirm`) submitForm();
  form.reset();
  dialog.returnValue = ``;
}

function submitForm() {
  const title = titleInput.value.trim();
  const project = ProjectService.add({ title: title });
  ProjectList.addItem(project);
}
