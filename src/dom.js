export function displayProjectTitles(listArray) {
  const listContainer = document.querySelector(`#sidebarListCntr`);

  listArray.forEach((item) => {
    const listItem = createElement(`li`, `sidebar__projects-title-list-item`);
    listItem.textContent = item.name;
    listContainer.appendChild(listItem);
  });
}

function createElement(elem, cls) {
  if (!elem || typeof elem !== `string` || elem.trim() === ``) return;
  const el = document.createElement(elem);
  if (!cls || typeof cls !== `string` || cls.trim() === ``) return el;
  el.classList.add(cls);
  return el;
}
