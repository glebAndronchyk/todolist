import { v4 as uuidv4 } from 'uuid';
import { setDataToLocalStorage } from './localStorage';
// eslint-disable-next-line import/no-cycle,import/no-duplicates
import { render } from './app';
// eslint-disable-next-line import/prefer-default-export,import/no-cycle,import/no-duplicates,import/named
import { form } from './app';
import { Empty } from './emptyElement';

// eslint-disable-next-line import/prefer-default-export
export class Form {
  constructor() {
    this.form = document.querySelector('#form');
    this.priorityState = 'all';
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

    setDataToLocalStorage(formData);

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
