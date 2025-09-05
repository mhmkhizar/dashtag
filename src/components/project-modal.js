import * as ProjectService from "../services/project-service";
import * as ProjectList from "./sidebar/projects-list";

const openBtn = document.querySelector(`#open-project-modal`);
const modal = document.querySelector(`#project-modal`);
const form = modal.querySelector(`#project-form`);
const nameInput = form.querySelector(`#project-form-name-input`);
const closeBtn = form.querySelector(`#close-project-modal`);
const submitBtn = form.querySelector(`#submit-project-form`);

export function init() {
  openBtn.addEventListener(`click`, openModal);
  closeBtn.addEventListener(`click`, closeModal);
  nameInput.addEventListener(`input`, toggleSubmitBtn);
  modal.addEventListener(`close`, submitModalForm);
}

function openModal() {
  submitBtn.setAttribute(`inert`, ``);
  modal.showModal();
}

function closeModal() {
  modal.close();
}

function toggleSubmitBtn() {
  if (nameInput.value.trim().length > 0) {
    submitBtn.removeAttribute(`inert`);
  } else {
    submitBtn.setAttribute(`inert`, ``);
  }
}

function submitModalForm() {
  if (modal.returnValue === `confirm`) {
    const name = nameInput.value.trim();
    const project = ProjectService.add(name);
    ProjectList.addItem(project);
  }
  form.reset();
  modal.returnValue = ``;
}
