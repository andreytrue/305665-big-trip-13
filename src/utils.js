export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
