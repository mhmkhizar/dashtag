import { tr } from "date-fns/locale";
import { getUserProjects, addProject } from "./project";
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

  const submitProject = () => {
    addProject(nameInput.value);
    SidebarList.render();
  };

  return { init };
})();

const SidebarList = (() => {
  const list = $(`#sidebarList`);

  const init = () => {
    render();
    list.addEventListener(`mouseenter`, (e) => handleItemHover(e, true), true);
    list.addEventListener(`mouseleave`, (e) => handleItemHover(e, false), true);
  };

  const render = () => {
    list.innerHTML = ``;
    getUserProjects().forEach((project) => {
      const listItem = createElement({
        element: `li`,
        className: `sidebar__list-item`,
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
        attribute: { name: `inert`, value: `` },
        textContent: `close`,
      });
      listItem.append(listIcon, itemText, closeIcon);
      list.appendChild(listItem);
    });
  };

  const handleItemHover = (e, visible) => {
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

  return { init, render };
})();

// function toggleClass({ element, className }) {
//   if (!element || !className) return;
//   if (element.classList.contains(className))
//     element.classList.remove(className);
//   else element.classList.add(className);
// }

function createElement({
  element,
  className,
  id,
  attribute,
  textContent,
  htmlContent,
}) {
  if (!element) return;
  const elem = document.createElement(element);
  if (className) elem.classList.add(...className.trim().split(/\s+/));
  if (id) elem.id = id;
  if (attribute) elem.setAttribute(attribute.name, attribute.value);
  if (textContent) elem.textContent = textContent;
  if (htmlContent) elem.innerHTML = htmlContent;
  return elem;
}

function $(selector, parent = document) {
  const elem = parent.querySelector(selector);
  return elem;
}
