import * as Helper from "../helper";

export function generate(item) {
  const itemLi = Helper.createElement({
    element: `li`,
    classes: `flex h-8 cursor-pointer items-center gap-2 rounded-[var(--radius)] px-4 hover:bg-current/10`,
    attributes: { "data-projectid": `${item.id}` },
  });
  const textSpan = Helper.createElement({
    element: `span`,
    textContent: `${item.title}`,
  });

  let iconSpan;
  if (isStarredTasksProject(item)) {
    iconSpan = Helper.createElement({
      element: `span`,
      classes: `icon material-symbols-rounded icon-wght-300`,
      textContent: `star`,
    });
  } else {
    iconSpan = Helper.createElement({
      element: `span`,
      classes: `icon material-symbols-rounded icon-wght-300 !text-2xl`,
      textContent: `check`,
    });
  }

  itemLi.append(iconSpan, textSpan);
  return itemLi;
}

function isStarredTasksProject(item) {
  return item.id === `starred-tasks-project`;
}
