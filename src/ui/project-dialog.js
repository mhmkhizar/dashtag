import * as ProjectService from "../logic/project-service";
import * as SidebarList from "./sidebar/sidebar-list";

const openBtn = document.querySelector(`#open-project-dialog`);
const dialog = document.querySelector(`#project-dialog`);
const form = dialog.querySelector(`#project-form`);
const nameInput = form.querySelector(`#project-form-name-input`);
const closeBtn = form.querySelector(`#close-project-dialog`);
const submitBtn = form.querySelector(`#submit-project-form`);

function init() {
  closeBtn.addEventListener(`click`, closeDialog);
  nameInput.addEventListener(`input`, toggleSubmitBtn);
  dialog.addEventListener(`close`, submitDialogForm);
}

export function initOpenBtn() {
  openBtn.addEventListener(`click`, openDialog);
}

function openDialog() {
  submitBtn.setAttribute(`inert`, ``);
  dialog.showModal();
  init();
}

function closeDialog() {
  dialog.close();
}

function toggleSubmitBtn() {
  if (nameInput.value.trim().length > 0) {
    submitBtn.removeAttribute(`inert`);
  } else {
    submitBtn.setAttribute(`inert`, ``);
  }
}

function submitDialogForm() {
  if (dialog.returnValue === `confirm`) {
    const name = nameInput.value.trim();
    const project = ProjectService.add(name);
    SidebarList.addItem(project);
  }
  form.reset();
  dialog.returnValue = ``;
}
