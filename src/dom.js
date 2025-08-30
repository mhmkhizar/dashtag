import { ProjectService } from "./project-service";
export { DOM };

const DOM = (() => {
  return {
    init: () => {
      SidebarList.render();
      SidebarListItem.init();
      ProjectModal.init();
    },
  };
})();

const ProjectModal = (() => {
  const openBtn = $(`#openProjectModalBtn`);
  const modal = $(`#projectModal`);
  const form = $(`#projectModalForm`, modal);
  const nameInput = $(`#projectName`, form);
  const closeBtn = $(`#closeProjectModalBtn`, form);
  const submitBtn = $(`#submitProjectFormBtn`, form);

  const init = () => {
    openBtn.addEventListener(`click`, openModal);
    closeBtn.addEventListener(`click`, closeModal);
    nameInput.addEventListener(`input`, toggleSubmitBtn);
    modal.addEventListener(`close`, submitModalForm);
  };

  const openModal = () => {
    submitBtn.setAttribute(`inert`, ``);
    modal.showModal();
  };

  const closeModal = () => {
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
    if (modal.returnValue === `confirm`) {
      const name = nameInput.value.trim();
      const project = ProjectService.add(name);
      SidebarList.addItem(project);
    }
    form.reset();
  };

  return { init };
})();

const SidebarList = (() => {
  const list = $(`#sidebarList`);

  const render = () => {
    list.innerHTML = ``;
    ProjectService.getAll().forEach(addItem);
  };

  const removeItem = (id) => {
    const item = list.querySelector(`[data-projectid="${id}"]`);
    item.remove();
  };

  const addItem = (project) => {
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

  return { render, addItem, removeItem };
})();

const SidebarListItem = (() => {
  const list = $(`#sidebarList`);

  const init = () => {
    list.addEventListener(`mouseenter`, (e) => handleItemHover(e, true), true);
    list.addEventListener(`mouseleave`, (e) => handleItemHover(e, false), true);
    list.addEventListener(`click`, (e) => handleCloseIconClick(e));
  };

  const handleItemHover = (e, visible) => {
    if (!e.target.classList.contains(`sidebar__list-item`)) return;
    const currentItem = e.target;
    const defaultItemID = ProjectService.getDefault().id;
    if (currentItem.dataset.projectid === defaultItemID) return;
    const closeIcon = $(`.icon:last-of-type`, currentItem);
    if (visible) {
      closeIcon.classList.remove(`hidden`);
      closeIcon.removeAttribute(`inert`);
    } else {
      closeIcon.setAttribute(`inert`, ``);
      closeIcon.classList.add(`hidden`);
    }
  };

  const handleCloseIconClick = (e) => {
    if (e.target.id !== `deleteProjectBtn`) return;
    const closeIcon = e.target;
    const itemProjectID = closeIcon.closest(`li`).dataset.projectid;
    const isRemove = ProjectService.remove(itemProjectID);
    if (isRemove) SidebarList.removeItem(`${itemProjectID}`);
  };

  return { init };
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
