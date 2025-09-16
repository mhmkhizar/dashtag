import * as Helper from "../helper";

export function generate(item) {
  const itemLi = Helper.createElement({
    element: `li`,
    classes: `flex w-full items-start gap-2 px-6 pt-2 pb-3 hover:bg-current/10`,
  });
  const checkInput = Helper.createElement({
    element: `input`,
    classes: `mt-1.5`,
    attributes: { type: `checkbox` },
  });
  const titleAndDateDiv = Helper.createElement({
    element: `div`,
    classes: `flex w-[calc(100%-4rem)] flex-col items-start gap-1`,
  });
  const titleSpan = Helper.createElement({
    element: `span`,
    classes: `w-full truncate`,
    textContent: `${item.title}`,
  });
  const dateSpan = Helper.createElement({
    element: `span`,
    classes: `w-fit rounded-[var(--radius)] border border-current/35 px-2 py-0.5 text-sm text-current/85`,
    textContent: `${item.dueDate}`,
  });
  const deleteIconSpan = Helper.createElement({
    element: `span`,
    classes: `icon material-symbols-rounded icon-wght-200 custom-hidden leading-0`,
  });
  const starIconSpan = Helper.createElement({
    element: `span`,
    classes: `icon material-symbols-rounded icon-fill custom-hidden ml-1 leading-0 text-[var(--primary)]`,
  });

  titleAndDateDiv.append(titleSpan, dateSpan);
  itemLi.append(checkInput, titleAndDateDiv, deleteIconSpan, starIconSpan);
  return itemLi;
}
