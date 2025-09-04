export const element = {
  create: createElement,
};

function createElement({
  element,
  classes,
  id,
  attributes = {},
  textContent,
  htmlContent,
}) {
  if (!element) return;
  const elem = document.createElement(element);

  if (classes) elem.classList.add(...classes.trim().split(/\s+/));
  if (id) elem.id = id;
  Object.entries(attributes).forEach(([name, value]) => {
    elem.setAttribute(name, value);
  });
  if (textContent) elem.textContent = textContent;
  if (htmlContent) elem.innerHTML = htmlContent;

  return elem;
}
