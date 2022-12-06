import { getAllData, clearLocalStorageList } from './localStorage';
// eslint-disable-next-line import/no-cycle
import { render, form } from './app';

// eslint-disable-next-line import/prefer-default-export
export class Filters {
  constructor() {
    this.btns = document.querySelectorAll('.filter-btn');
    this.deleteAll = document.querySelector('.delete-button_all');
    this.priorityState = 'all';
  }

  addListeners() {
    this.btns.forEach((btn) => btn.addEventListener('click', this.filterList.bind(this)));
    this.deleteAll.addEventListener('click', this.clearList.bind(this));
  }

  filterList(event) {
    const btnValue = event.target.value;
    const data = getAllData();
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
    clearLocalStorageList();
    render.removeChildNodes();
    render.renderEmpty();
  }
}
