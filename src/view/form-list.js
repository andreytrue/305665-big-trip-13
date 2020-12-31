import AbstractView from "./abstract.js";

const createFormListTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

export default class FormList extends AbstractView {
  getTemplate() {
    return createFormListTemplate();
  }
}
