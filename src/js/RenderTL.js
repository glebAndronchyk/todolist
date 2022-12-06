import { Empty } from './emptyElement';
import { Priority } from './priority';
import { DeleteButton } from './deleteBtn';
import { Checkbox } from './checkbox';

// eslint-disable-next-line import/prefer-default-export
export class RenderTasksList {
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

    deleteButton.addListener();
    checkbox.input.addEventListener('change', checkbox.completionStatus);
  }
}
