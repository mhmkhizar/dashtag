export function renderSidebarList(list) {
  const ul = document.querySelector(`#sidebarList`);

  list.forEach((item) => {
    const li = createElement({
      elem: `li`,
      cls: `sidebar__list-item`,
    });
    const span = createElement({
      elem: `span`,
      cls: `sidebar__list-item-icon icon material-symbols-rounded`,
      content: `list`,
    });
    li.textContent = item.name;
    li.prepend(span);
    ul.appendChild(li);
  });
}

function createElement({ elem, cls = ``, id = ``, content = `` }) {
  if (!elem || typeof elem !== `string` || elem.trim() === ``) return;
  const element = document.createElement(elem);

  if (typeof cls === `string` || cls.trim() !== ``) {
    element.classList.add(...cls.trim().split(/\s+/));
  }

  if (typeof id === `string` || id.trim() !== ``) {
    element.id = id;
  }

  if (typeof content === `string` || content.trim() !== ``) {
    element.textContent = content;
  }

  return element;
}
