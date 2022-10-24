import '../scss/app.scss';
import { setDataToLocalStorage, initLocalStorage, removeItemFromLocalStorage, changeDoneStatus, getAllData } from './localStorage';
import { v4 as uuidv4 } from 'uuid';

/* Your JS Code goes here */
document.addEventListener('DOMContentLoaded', () => {
    const DATA = initLocalStorage();
    renderList(DATA);
    const form = document.querySelector('#form');
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', priorityFilter);
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        const eventTarget = event.target;
        const formData = {
            taskName: eventTarget.elements["input-text"].value,
            priority: eventTarget.elements["priority-select"].value,
            isDone: false,
            id: uuidv4(),
        };
        if (!formData.taskName) {
            return;
        }
        setDataToLocalStorage(formData);
        renderListItem(formData);
        priorityFilter(formData.priority);
        eventTarget.reset();
    });

    function renderList(arr) {
        arr.forEach(item => {
            renderListItem(item);
        });
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function priorityFilter(event, priority) {
        const btnValue = event.target.value;
        const data = getAllData();
        console.log(btnValue == priority);
        if (btnValue === priority) {
            setDataToLocalStorage(data);
            return;
        }
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
        const parent = event.target.parentElement;
        const ID = parent.getAttribute('data-id');
        const CHECKED = event.target.checked;
        changeDoneStatus(ID, CHECKED);
        if (CHECKED) {
            parent.classList.add('done');
        } else {
            parent.classList.remove('done');
        }
    }

    function deleteItem(event) {
        const parent = event.target.parentElement;
        const ID = parent.getAttribute('data-id');
        removeItemFromLocalStorage(ID);
        parent.remove();
    }

    function renderListItem(listItem) {
        const tasksList = document.querySelector('#tasks-list');
        const taskItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        const isCompletedCheckbox = document.createElement('input');

        isCompletedCheckbox.setAttribute('type', 'checkbox');
        isCompletedCheckbox.setAttribute('name', 'isCompleted');
        isCompletedCheckbox.checked = listItem.isDone;

        taskItem.innerHTML = `<span>${listItem.taskName}, priority: ${listItem.priority}</span>`;
        taskItem.classList.add('list-item');
        taskItem.setAttribute('data-id', listItem.id);

        deleteButton.innerHTML = 'X';
        deleteButton.classList.add('delete-button');

        if (listItem.isDone) {
            taskItem.classList.add('done');
        }

        taskItem.prepend(isCompletedCheckbox);
        taskItem.append(deleteButton);
        tasksList.append(taskItem);

        deleteButton.addEventListener('click', deleteItem);
        isCompletedCheckbox.addEventListener('change', isCompletedChecker);
    } 
});