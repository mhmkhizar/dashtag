import * as Helper from "../../utils/helper";
import * as ProjectService from "../../services/project-service";
import * as Sidebar from "../sidebar/sidebar";

const openBtn = Helper.$(`#openProjectModal`);
const modal = Helper.$(`#projectModal`);
const form = Helper.$(`#projectModalForm`, modal);
const nameInput = Helper.$(`#projectName`, form);
const closeBtn = Helper.$(`#closeProjectModal`, form);
const submitBtn = Helper.$(`#submitProjectForm`, form);

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
    Sidebar.addItem(project);
  }
  form.reset();
  modal.returnValue = ``;
}
