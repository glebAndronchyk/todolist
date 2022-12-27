import { storage, render, form } from './app';

export default class Filters {
  constructor() {
    this.priorityState = 'all';
  }

  addListeners() {
    const btns = document.querySelectorAll('.filter-btn');
    const deleteAll = document.querySelector('.delete-button_all');
    btns.forEach((btn) => btn.addEventListener('click', this.filterList.bind(this)));
    deleteAll.addEventListener('click', this.clearList.bind(this));
  }

  filterList(event) {
    const btnValue = event.target.value;
    const data = storage.getAll;
    this.priorityState = btnValue;
    form.priorityState = this.priorityState;
    render.removeChildNodes();

    if (btnValue === 'all') {
      render.renderList(data);
      return;
    }
    const filteredData = data.filter((item) => item.priority === btnValue);
    render.renderList(filteredData);
  }

  // eslint-disable-next-line class-methods-use-this
  clearList() {
    storage.clearStorage();
    render.removeChildNodes();
    render.renderEmpty();
  }
}
