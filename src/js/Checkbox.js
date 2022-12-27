import { storage } from './app';

export default class Checkbox {
  constructor(listItem) {
    this.listItem = listItem;
    this.label = document.createElement('label');
    this.input = document.createElement('input');
    this.mark = document.createElement('span');
    this.ico = document.createElement('i');
  }

  build() {
    this.label.classList.add('label-for-checkbox');
    this.label.append(this.input);
    this.label.append(this.mark);

    // Input
    this.input.classList.add('mark-checkbox');
    this.input.setAttribute('type', 'checkbox');
    this.input.checked = this.listItem.isDone;

    // Ico
    this.ico.classList.add('fa-solid', 'fa-check', 'check-ico', this.listItem.isDone ? 'shown' : undefined);

    // Mark
    this.mark.classList.add('checkmark', this.listItem.isDone ? 'shown' : undefined);
    this.mark.append(this.ico);
  }

  // eslint-disable-next-line class-methods-use-this
  completionStatus(event) {
    // console.log(event.target.parentElement.parentElement.parentElement);
    const parent = event.target.parentElement.parentElement.parentElement;
    const ID = parent.getAttribute('data-id');
    const CHECKED = event.target.checked;
    storage.changeStatus(ID, CHECKED);
    if (CHECKED) {
      parent.querySelector('.checkmark').classList.add('shown');
      parent.querySelector('.check-ico').classList.add('shown');
      parent.querySelector('.list-item__text').classList.add('done');
    } else {
      parent.querySelector('.checkmark').classList.remove('shown');
      parent.querySelector('.check-ico').classList.remove('shown');
      parent.querySelector('.list-item__text').classList.remove('done');
    }
  }
}
