import {
  getUserProjects,
  createProject,
  saveProject,
  deleteProject,
  getDefaultProject,
} from "./project";
export { DOM };

const DOM = (() => {
  const init = () => {
    ProjectModal.init();
    SidebarList.init();
  };
  return { init };
})();

const ProjectModal = (() => {
  const openBtn = $(`#openProjectModalBtn`);
  const modal = $(`#projectModal`);
  const nameInput = $(`#projectName`, modal);
  const closeBtn = $(`#closeProjectModalBtn`, modal);
  const submitBtn = $(`#submitProjectFormBtn`, modal);

  const init = () => {
    activateEvents();
  };

  const activateEvents = () => {
    openBtn.addEventListener(`click`, openModal);
    closeBtn.addEventListener(`click`, closeModal);
    nameInput.addEventListener(`input`, toggleSubmitBtn);
    submitBtn.addEventListener(`click`, submitModalForm);
  };

  const openModal = () => {
    nameInput.value = ``;
    submitBtn.setAttribute(`inert`, ``);
    modal.showModal();
  };

  const closeModal = () => {
    nameInput.value = ``;
    modal.close();
  };

  const toggleSubmitBtn = () => {
    if (nameInput.value.trim().length > 0) {
      submitBtn.removeAttribute(`inert`);
    } else {
      submitBtn.setAttribute(`inert`, ``);
    }
  };

  const submitModalForm = () => {
    const project = createProject(nameInput.value);
    saveProject(project);
    SidebarList.renderItem(project);
  };

  return { init };
})();

const SidebarList = (() => {
  const list = $(`#sidebarList`);

  const init = () => {
    activateEvents();
    renderList();
  };

  const activateEvents = () => {
    list.addEventListener(`mouseenter`, (e) => onItemHover(e, true), true);
    list.addEventListener(`mouseleave`, (e) => onItemHover(e, false), true);
    list.addEventListener(`click`, (e) => onCloseIconClick(e));
  };

  const onCloseIconClick = (e) => {
    if (e.target.id !== `deleteProjectBtn`) return;
    const closeIcon = e.target;
    const itemProjectID = closeIcon.closest(`li`).dataset.projectid;
    deleteProject(itemProjectID);
    removeItem(`${itemProjectID}`);
  };

  const renderList = () => {
    list.innerHTML = ``;
    getUserProjects().forEach(renderItem);
  };

  const removeItem = (id) => {
    const item = list.querySelector(`[data-projectid="${id}"]`);
    item.remove();
  };

  const renderItem = (project) => {
    const listItem = createElement({
      element: `li`,
      className: `sidebar__list-item`,
      attributes: { "data-projectid": `${project.id}` },
    });
    const listIcon = createElement({
      element: `span`,
      className: `sidebar__list-item-icon icon material-symbols-rounded`,
      textContent: `list`,
    });
    const itemText = createElement({
      element: `span`,
      className: `sidebar__list-item-text`,
      textContent: project.name,
    });
    const closeIcon = createElement({
      element: `span`,
      className: `sidebar__list-item-icon icon material-symbols-rounded hidden`,
      id: `deleteProjectBtn`,
      attributes: { inert: `` },
      textContent: `close`,
    });
    listItem.append(listIcon, itemText, closeIcon);
    list.appendChild(listItem);
  };

  const onItemHover = (e, visible) => {
    if (!e.target.classList.contains(`sidebar__list-item`)) return;
    const listItem = e.target;
    toggleCloseIcon(listItem, visible);
  };

  const toggleCloseIcon = (parent, show) => {
    const closeIcon = parent.querySelector(`.icon:last-of-type`);
    if (show) {
      closeIcon.classList.remove(`hidden`);
      closeIcon.removeAttribute(`inert`);
    } else {
      closeIcon.setAttribute(`inert`, ``);
      closeIcon.classList.add(`hidden`);
    }
  };

  return { init, renderList, renderItem };
})();

function createElement({
  element,
  className,
  id,
  attributes = {},
  textContent,
  htmlContent,
}) {
  if (!element) return;
  const elem = document.createElement(element);

  if (className) elem.classList.add(...className.trim().split(/\s+/));
  if (id) elem.id = id;
  Object.entries(attributes).forEach(([name, value]) => {
    elem.setAttribute(name, value);
  });
  if (textContent) elem.textContent = textContent;
  if (htmlContent) elem.innerHTML = htmlContent;

  return elem;
}

function $(selector, parent = document) {
  if (!selector) return;
  const elem = parent.querySelector(selector);
  return elem;
}
