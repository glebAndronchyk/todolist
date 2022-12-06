import '../scss/app.scss';
import { v4 as uuidv4 } from 'uuid';
/* import { Input } from 'postcss'; */
import {
  setDataToLocalStorage, initLocalStorage, removeItemFromLocalStorage, changeDoneStatus, getAllData, clearLocalStorageList,
} from './localStorage';

/* Your JS Code goes here */
document.addEventListener('DOMContentLoaded', () => {
  const DATA = initLocalStorage();
  renderList(DATA);

  const form = document.querySelector('#form');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const deleteAll = document.querySelector('.delete-button_all');
  const menu = document.querySelector('.control-panel');
  const hamburgerMenuOpenButton = document.querySelector('.hamburger');
  const closeHamburgerBtn = document.querySelector('.close-hamburger');
  const overlay = document.querySelector('.overlay');
  let priorityState = 'all';

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', priorityFilter);
  });

  closeHamburgerBtn.addEventListener('click', closeHamburgerMenu);
  hamburgerMenuOpenButton.addEventListener('click', openHamburgerMenu);
  deleteAll.addEventListener('click', clearList);
  // taskInput.addEventListener('click', textInInputChecker);

  form.addEventListener('submit', (event) => {
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
    if (priorityState === 'all' || priorityState === formData.priority) {
      deleteEmptyHolder();
      renderListItem(formData);
      eventTarget.querySelector('#input-text').value = '';
    }
  });

  function closeHamburgerMenu() {
    menu.classList.remove('opened');
    overlay.classList.remove('visible');
    overlay.removeEventListener('click', closeHamburgerMenu);
  }

  function openHamburgerMenu() {
    menu.classList.add('opened');
    overlay.classList.add('visible');
    overlay.addEventListener('click', closeHamburgerMenu);
  }

  function clearList() {
    const tasksList = document.querySelector('#tasks-list');
    clearLocalStorageList();
    removeAllChildNodes(tasksList);
    renderEmpty();
  }

  function renderList(arr) {
    if (arr.length === 0) {
      renderEmpty();
    }
    arr.forEach((item) => {
      renderListItem(item);
    });
  }

  function renderEmpty() {
    const tasksList = document.querySelector('#tasks-list');
    const taskItem = document.createElement('tr');
    const tdEmpty = document.createElement('td');
    tdEmpty.classList.add('centered');
    tdEmpty.setAttribute('colspan', '4');
    taskItem.setAttribute('id', 'empty');

    tdEmpty.innerHTML = '<span class="empty-placeholer">Nothing in the list</span>';
    taskItem.append(tdEmpty);
    tasksList.append(taskItem);
  }

  function deleteEmptyHolder() {
    const tasksList = document.querySelector('#tasks-list');
    const empty = document.querySelector('#empty');
    if (empty) {
      tasksList.classList.remove('centered');
      empty.remove();
    }
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function priorityFilter(event) {
    const btnValue = event.target.value;
    priorityState = btnValue;
    const data = getAllData();
    const tasksList = document.querySelector('#tasks-list');
    removeAllChildNodes(tasksList);

    if (btnValue === 'all') {
      renderList(data);
      return;
    }
    const filteredData = data.filter((item) => item.priority === btnValue);
    renderList(filteredData);
  }

  function isCompletedChecker(event) {
    // console.log(event.target);
    const parent = event.target.parentElement.parentElement.parentElement;
    const ID = parent.getAttribute('data-id');
    const CHECKED = event.target.checked;
    changeDoneStatus(ID, CHECKED);
    if (CHECKED) {
      // console.log('1 - ent');
      parent.querySelector('.checkmark').classList.add('shown');
      parent.querySelector('.check-ico').classList.add('shown');
      parent.querySelector('.list-item__text').classList.add('done');
    } else {
      // console.log('2 - ent');
      parent.querySelector('.checkmark').classList.remove('shown');
      parent.querySelector('.check-ico').classList.remove('shown');
      parent.querySelector('.list-item__text').classList.remove('done');
    }
  }

  function deleteItem(event) {
    const tasksList = document.querySelector('#tasks-list');
    const parent = event.currentTarget.parentElement.parentElement;
    const ID = parent.getAttribute('data-id');
    removeItemFromLocalStorage(ID);
    parent.remove();
    if (tasksList.childElementCount === 0) {
      renderEmpty();
    }
  }

  function renderHighPriority() {
    return '<i class="fa-solid fa-arrow-up high-priority priority"></i>';
  }

  function renderMediumPriority() {
    return '<i class="fa-solid fa-equals medium-priority priority"></i>';
  }

  function renderLowPriority() {
    return '<i class="fa-solid fa-arrow-down low-priority priority"></i>';
  }

  function renderPriority(priority) {
    if (priority === 'high') {
      return renderHighPriority();
    }
    if (priority === 'medium') {
      return renderMediumPriority();
    }
    if (priority === 'low') {
      return renderLowPriority();
    }
    return 'unknown';
  }

  function renderListItem(listItem) {
    const tasksList = document.querySelector('#tasks-list');
    const taskRow = document.createElement('tr');
    const tdCheckbox = document.createElement('td');
    const tdName = document.createElement('td');
    const tdPriority = document.createElement('td');
    const tdDelete = document.createElement('td');
    const deleteButton = document.createElement('button');
    const isCompletedCheckbox = document.createElement('label');
    const checkBoxInput = document.createElement('input');
    const checkMark = document.createElement('span');
    const checkIco = document.createElement('i');

    tdCheckbox.classList.add('td-checkbox');
    isCompletedCheckbox.classList.add('label-for-checkbox');
    isCompletedCheckbox.append(checkBoxInput);
    isCompletedCheckbox.append(checkMark);
    checkBoxInput.setAttribute('type', 'checkbox');
    checkBoxInput.checked = listItem.isDone;
    checkBoxInput.classList.add('mark-checkbox');
    checkMark.classList.add('checkmark', listItem.isDone ? 'shown' : undefined);
    checkIco.classList.add('fa-solid', 'fa-check', 'check-ico', listItem.isDone ? 'shown' : undefined);
    checkMark.append(checkIco);

    taskRow.setAttribute('title', listItem.taskName);

    taskRow.setAttribute('data-id', listItem.id);

    deleteButton.innerHTML = '<i class="fa-regular fa-square-minus remove-ico"></i>';
    deleteButton.classList.add('delete-button');

    const test = [tdCheckbox, tdName, tdPriority, tdDelete];

    tdCheckbox.append(isCompletedCheckbox);
    tdName.innerHTML = `<span class="list-item__text ${listItem.isDone ? 'done' : null}">${listItem.taskName}</span>`;

    tdPriority.innerHTML = `${renderPriority(listItem.priority)}`;
    tdDelete.append(deleteButton);
    taskRow.append(...test);

    tasksList.append(taskRow);

    deleteButton.addEventListener('click', deleteItem);
    checkBoxInput.addEventListener('change', isCompletedChecker);
  }
});
