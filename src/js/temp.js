// eslint-disable-next-line max-classes-per-file
import '../scss/app.scss';
import { v4 as uuidv4 } from 'uuid';
import {
  setDataToLocalStorage, initLocalStorage, removeItemFromLocalStorage, changeDoneStatus, getAllData, clearLocalStorageList,
} from './localStorage';

const DATA = initLocalStorage();
const render = new RenderTasksList(DATA);
render.renderList();
class RenderTasksList {
  constructor(data) {
    this.data = data;
    this.list = document.querySelector('#tasks-list');
  }

  renderList() {
    if (this.data.length === 0) {
      this.renderEmpty();
    }
    this.data.forEach((item) => this.renderListItem(item));
  }

  renderEmpty() {
    new Empty(this.list).build();
  }

  renderListItem(item) {
    const tasksList = this.list;
    const taskRow = document.createElement('tr');
    const tdCheckbox = document.createElement('td');
    const tdName = document.createElement('td');
    const tdPriority = document.createElement('td');
    const tdDelete = document.createElement('td');
    const tableItems = [tdCheckbox, tdName, tdPriority, tdDelete];

    taskRow.setAttribute('title', item.taskName);
    taskRow.setAttribute('data-id', item.id);
    tdName.innerHTML = `<span class="list-item__text ${item.isDone ? 'done' : null}">${item.taskName}</span>`;
    tdPriority.innerHTML = `${new Priority().renderPriority(item.priority)}`;

    // DelBtn
    const deleteButton = new DeleteButton(tasksList);
    deleteButton.btn.innerHTML = '<i class="fa-regular fa-square-minus remove-ico"></i>';
    deleteButton.btn.classList.add('delete-button');
    tdDelete.append(deleteButton.btn);

    // Checkbox
    tdCheckbox.classList.add('td-checkbox');
    const checkbox = new Checkbox(item);
    checkbox.build();
    tdCheckbox.append(checkbox.label);

    taskRow.append(...tableItems);
    tasksList.append(taskRow);

    deleteButton.btn.addEventListener('click', deleteButton.deleteItem);
    checkbox.input.addEventListener('change', checkbox.completionStatus);
  }
}
class Priority {
  // eslint-disable-next-line class-methods-use-this
  renderPriority(priority) {
    if (priority === 'high') {
      return '<i class="fa-solid fa-arrow-up high-priority priority"></i>';
    }
    if (priority === 'medium') {
      return '<i class="fa-solid fa-equals medium-priority priority"></i>';
    }
    if (priority === 'low') {
      return '<i class="fa-solid fa-arrow-down low-priority priority"></i>';
    }
    return 'unknown';
  }
}
class Checkbox {
  constructor(listItem) {
    this.listItem = listItem;
    this.label = document.createElement('label');
    this.input = document.createElement('input');
    this.mark = document.createElement('span');
    this.ico = document.createElement('i');
  }

  build() {
    this.label.append(this.input);
    this.label.append(this.mark);

    // Input
    this.input.classList.add('mark-checkbox');
    this.input.setAttribute('type', 'checkbox');
    this.input.checked = this.listItem.isDone;

    // Ico
    this.ico.classList.add('fa-solid', 'fa-check', 'check-ico', this.listItem.isDone ? 'shown' : undefined);

    // Mark
    this.mark.append(this.ico);
  }

  completionStatus(event) {
    const parent = this.input.parentElement.parentElement.parentElement;
    const ID = parent.getAttribute('data-id');
    const CHECKED = event.target.checked;
    changeDoneStatus(ID, CHECKED);
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
class DeleteButton {
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
}
class Empty {
  constructor(list) {
    this.parent = list;
    this.item = document.createElement('tr');
    if (document.querySelector('#empty')) {
      this.DOMEmpty = document.querySelector('#empty');
    } else {
      this.empty = document.createElement('td');
    }
  }

  build() {
    this.empty.classList.add('centered');
    this.empty.setAttribute('colspan', '4');
    this.empty.innerHTML = '<span class="empty-placeholer">Nothing in the list</span>';
    this.item.setAttribute('id', 'empty');
    this.item.append(this.empty);
    this.parent.append(this.item);
  }

  delete() {
    if (this.DOMEmpty) {
      // this.parent.classList.remove('centered');
      this.DOMEmpty.remove();
    }
  }
}
