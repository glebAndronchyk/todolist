import { v4 as uuidv4 } from 'uuid';
import {
  // eslint-disable-next-line import/named
  storage, render, filters, form,
} from './app';
import Empty from './EmptyElement';

export default class Form {
  constructor() {
    this.form = document.querySelector('#form');
    this.priorityState = filters.priorityState;
  }

  addTask(event) {
    event.preventDefault();
    const eventTarget = event.target;
    const formData = {
      taskName: eventTarget.elements['input-text'].value,
      priority: eventTarget.elements['priority-select'].value,
      isDone: false,
      id: uuidv4(),
    };

    if (!formData.taskName) {
      return;
    }

    storage.setData(formData);

    if (this.priorityState === 'all' || this.priorityState === formData.priority) {
      new Empty().delete();
      render.renderListItem(formData);
      eventTarget.querySelector('#input-text').value = '';
    }
  }

  addListener() {
    this.form.addEventListener('submit', this.addTask.bind(form));
  }
}
