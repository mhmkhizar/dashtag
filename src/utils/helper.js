export function $(selector, parent = document) {
  if (!selector) return;
  const elem = parent.querySelector(selector);
  return elem;
}

export function createElement({
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
