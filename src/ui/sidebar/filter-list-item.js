import * as Helper from "../helper";

export function generate(item) {
  const itemLi = Helper.createElement({
    element: `li`,
    classes: `filter-list-item flex h-8 cursor-pointer items-center gap-2 rounded-[var(--radius)] px-4 hover:bg-current/10`,
    attributes: { "data-projectid": `${item.id}` },
  });
  const iconSpan = Helper.createElement({
    element: `span`,
    classes:
      item.id === `starred-tasks-project`
        ? `filter-item-icon icon material-symbols-rounded icon-wght-300`
        : `filter-item-icon icon material-symbols-rounded icon-wght-300 !text-2xl`,
    textContent: item.id === `starred-tasks-project` ? `star` : `check`,
  });
  const textSpan = Helper.createElement({
    element: `span`,
    classes: `filter-item-text`,
    textContent: `${item.title}`,
  });

  itemLi.append(iconSpan, textSpan);
  return itemLi;
}
