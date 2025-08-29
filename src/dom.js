export const ProjectModal = (() => {
  const openBtn = $(`#openProjectModalBtn`);
  const modal = $(`#projectModal`);
  const nameInput = $(`#projectName`, modal);
  const closeBtn = $(`#closeProjectModalBtn`, modal);
  const submitBtn = $(`#submitProjectFormBtn`, modal);

  const init = () => {
    openBtn.addEventListener(`click`, open);
    closeBtn.addEventListener(`click`, close);
    nameInput.addEventListener(`input`, toggleSubmitBtn);
  };

  const open = () => {
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

  return { init };
})();

export const SidebarList = (() => {
  const ul = $(`#sidebarList`);

  const render = (userProjects) => {
    userProjects.forEach((project) => {
      const li = createElement({
        element: `li`,
        className: `sidebar__list-item`,
        textContent: project.name,
      });
      const span = createElement({
        element: `span`,
        className: `sidebar__list-item-icon icon material-symbols-rounded`,
        textContent: `list`,
      });
      li.prepend(span);
      ul.append(li);
    });
  };

  return { render };
})();

function createElement({ element, className, id, textContent, htmlContent }) {
  if (!element) return;
  const elem = document.createElement(element);
  if (className) elem.classList.add(...className.trim().split(/\s+/));
  if (id) elem.id = id;
  if (textContent) elem.textContent = textContent;
  if (htmlContent) elem.innerHTML = htmlContent;
  return elem;
}

function $(selector, parent = document) {
  const elem = parent.querySelector(selector);
  return elem;
}
