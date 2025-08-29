import { getUserProjects, addProject } from "./project";
export { DOM };

const DOM = (() => {
  const init = () => {
    ProjectModal.init();
    SidebarList.render();
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
    openBtn.addEventListener(`click`, open);
    closeBtn.addEventListener(`click`, close);
    nameInput.addEventListener(`input`, toggleSubmitBtn);
    submitBtn.addEventListener(`click`, submitProject);
  };

  const open = () => {
    nameInput.value = ``;
    submitBtn.setAttribute(`inert`, ``);
    modal.showModal();
  };

  const close = () => {
    modal.close();
  };

  const toggleSubmitBtn = () => {
    if (nameInput.value.trim().length > 0) {
      submitBtn.removeAttribute(`inert`);
    } else {
      submitBtn.setAttribute(`inert`, ``);
    }
  };

  const submitProject = () => {
    addProject(nameInput.value);
    SidebarList.render();
  };

  return { init };
})();

const SidebarList = (() => {
  const list = $(`#sidebarList`);

  const render = () => {
    list.innerHTML = ``;
    getUserProjects().forEach((project) => {
      const listItem = createElement({
        element: `li`,
        className: `sidebar__list-item`,
        textContent: project.name,
      });
      const listIcon = createElement({
        element: `span`,
        className: `sidebar__list-item-icon icon material-symbols-rounded`,
        textContent: `list`,
      });
      const closeIcon = createElement({
        element: `span`,
        className: `sidebar__list-item-icon icon material-symbols-rounded hidden`,
        attribute: { name: `inert`, value: `` },
        textContent: `close`,
      });
      listItem.prepend(listIcon);
      listItem.append(closeIcon);
      list.append(listItem);
    });
  };

  return { render };
})();

function createElement({
  element = ``,
  className = ``,
  id = ``,
  attribute = {},
  textContent = ``,
  htmlContent = ``,
}) {
  if (!element) return;
  const elem = document.createElement(element);
  if (className) elem.classList.add(...className.trim().split(/\s+/));
  if (id) elem.id = id;
  if (attribute.name && attribute.value)
    elem.setAttribute(attribute.name, attribute.value);
  if (textContent) elem.textContent = textContent;
  if (htmlContent) elem.innerHTML = htmlContent;
  return elem;
}

function $(selector = ``, parent = document) {
  const elem = parent.querySelector(selector);
  return elem;
}
