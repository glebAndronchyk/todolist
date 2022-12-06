import { removeItemFromLocalStorage } from './localStorage';
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
    removeItemFromLocalStorage(ID);
    parent.remove();
    if (this.tasksList.childElementCount === 0) {
      new Empty(this.tasksList).build();
    }
  }

  addListener(context) {
    this.btn.addEventListener('click', this.deleteItem.bind(context));
  }
}
