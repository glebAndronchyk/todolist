import '../scss/app.scss';
import { setDataToLocalStorage, initLocalStorage, removeItemFromLocalStorage, changeDoneStatus, getAllData, getElementFromData, clearLocalStorageList } from './localStorage';
import { v4 as uuidv4 } from 'uuid';

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
    let priorityState = 'all';

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', priorityFilter);
    });

    closeHamburgerBtn.addEventListener('click', closeHamburgerMenu);
    hamburgerMenuOpenButton.addEventListener('click', openHamburgerMenu);
    deleteAll.addEventListener('click', clearList);

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
        if (priorityState === 'all' || priorityState === formData.priority) {
            deleteEmptyHolder();
            renderListItem(formData);
            eventTarget.reset();
        }
        // priorityFilter(formData.priority);

    });

    function closeHamburgerMenu() {
        menu.classList.remove('opened');
    }

    function openHamburgerMenu() {
        menu.classList.add('opened');
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
        arr.forEach(item => {
            renderListItem(item);
        });
    }

    function renderEmpty() {
        const tasksList = document.querySelector('#tasks-list');
        const taskItem = document.createElement('li');
        tasksList.classList.add('centered');
        taskItem.setAttribute('id', 'empty');

        taskItem.innerHTML = `<span class="empty-placeholer">Nothing in the list</span>`;
        tasksList.append(taskItem);        
    }

    function deleteEmptyHolder () {
        const tasksList = document.querySelector('#tasks-list');
        const empty = document.querySelector('#empty');
        if(empty) {
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
        const tasksList = document.querySelector('#tasks-list');
        const parent = event.currentTarget.parentElement;
        const ID = parent.getAttribute('data-id');
        removeItemFromLocalStorage(ID);
        parent.remove();
        if (tasksList.childElementCount === 0) {
            renderEmpty();
        }
    }

    function renderHighPriority() {
        return `<i class="fa-solid fa-arrow-up high-priority priority"></i>`;
    }

    function renderMediumPriority() {
        return `<i class="fa-solid fa-equals medium-priority priority"></i>`;
    }

    function renderLowPriority() {
        return `<i class="fa-solid fa-arrow-down low-priority priority"></i>`;
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

    function taskNameLengthChecker(taskName) {
        if (taskName.length > 50) {
            // const seeMoreButton = document.createElement('button');
            // const itemName = document.querySelector('.list-item__task-name');
            // seeMoreButton.textContent = '...';
            // seeMoreButton.classList.add('see-more');


            // itemName.append(seeMoreButton);
            return `${taskName.substring(0, 50)}`;
        }
        return taskName;
    }

    function renderListItem(listItem) {
        const tasksList = document.querySelector('#tasks-list');
        const taskItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        const isCompletedCheckbox = document.createElement('input');

        isCompletedCheckbox.setAttribute('type', 'checkbox');
        isCompletedCheckbox.setAttribute('name', 'isCompleted');
        isCompletedCheckbox.checked = listItem.isDone;

        taskItem.innerHTML = `<span class="list-item__text"><span class="list-item__task-name">${taskNameLengthChecker(listItem.taskName)}</span> ${renderPriority(listItem.priority)}</span>`;
        taskItem.classList.add('list-item');
        taskItem.setAttribute('data-id', listItem.id);

        deleteButton.innerHTML = '<i class="fa-regular fa-square-minus remove-ico"></i>';
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