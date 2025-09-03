import { Element } from "../../utils/helper";
import * as ProjectService from "../../services/project-service";
import * as Sidebar from "../sidebar/sidebar";

const openBtn = Element.select(`#open-project-modal`);
const modal = Element.select(`#project-modal`);
const form = Element.select(`#project-modal-form`, modal);
const nameInput = Element.select(`#project-name-input`, form);
const closeBtn = Element.select(`#close-project-modal`, form);
const submitBtn = Element.select(`#submit-project-form`, form);

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
