import * as Helper from "../../../utils/helper";
import * as ProjectService from "../../../services/project-service";
import * as Sidebar from "../../sidebar/sidebar";

const openBtn = Helper.$(`#open-project-modal`);
const modal = Helper.$(`#project-modal`);
const form = Helper.$(`#project-modal-form`, modal);
const nameInput = Helper.$(`#project-name-input`, form);
const closeBtn = Helper.$(`#close-project-modal`, form);
const submitBtn = Helper.$(`#submit-project-form`, form);

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
