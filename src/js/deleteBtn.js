// eslint-disable-next-line import/named,import/no-cycle
import { storage } from './app';
import { Empty } from './emptyElement';

// eslint-disable-next-line import/prefer-default-export
export class DeleteButton {
  constructor(tasksList) {
    this.tasksList = tasksList;
    this.btn = document.createElement('button');
  }

  deleteItem(event) {
    const parent = event.currentTarget.parentElement.parentElement;
    const ID = parent.getAttribute('data-id');
    storage.removeItem(ID);
    parent.remove();
    if (this.tasksList.childElementCount === 0) {
      new Empty(this.tasksList).build();
    }
  }

  addListener() {
    this.btn.addEventListener('click', this.deleteItem.bind(this));
  }
}
