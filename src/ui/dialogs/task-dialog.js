const dialog = document.querySelector(`#task-dialog`);
const form = dialog.querySelector(`#task-form`);
const titleInput = document.querySelector(`#task-title-input`);
const descInput = document.querySelector(`#task-desc-input`);
const todayInput = document.querySelector(`#task-today-input`);
const todayLabel = document.querySelector(`#task-today-label`);
const tomorrowInput = document.querySelector(`#task-tomorrow-input`);
const tomorrowLabel = document.querySelector(`#task-tomorrow-label`);
const dateInput = document.querySelector(`#task-date-input`);
const dateLabel = document.querySelector(`#task-date-label`);
const closeBtn = form.querySelector(`#close-task-dialog`);
const submitBtn = form.querySelector(`#submit-task-form`);

export function init() {
  closeBtn.addEventListener(`click`, closeDialog);
  titleInput.addEventListener(`input`, toggleSubmitBtn);
  dialog.addEventListener(`close`, handleDialogClose);
}

export function openDialog() {
  submitBtn.setAttribute(`inert`, ``);
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
  form.reset();
  dialog.returnValue = ``;
}

todayInput.addEventListener(`input`, (e) => dateLabelsToggle(e));
tomorrowInput.addEventListener(`input`, (e) => dateLabelsToggle(e));
dateInput.addEventListener(`input`, (e) => dateLabelsToggle(e));

function handleDateInput(e) {}

function dateLabelsToggle(e) {
  const dateLabels = [todayLabel, tomorrowLabel, dateLabel];
  dateLabels.forEach((label) => {
    if (label.getAttribute(`for`) === e.target.id) return;
    label.classList.toggle(`hidden`);
  });
}
