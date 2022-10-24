export const setDataToLocalStorage = (tasks) => {
    const items = JSON.parse(localStorage.getItem('TODOLIST'));
    const newData = [...items, tasks];
    localStorage.setItem('TODOLIST', JSON.stringify(newData));
};
export const initLocalStorage = () => {
    if (localStorage.getItem('TODOLIST')) {
        return JSON.parse(localStorage.getItem('TODOLIST'));
    }
    localStorage.setItem('TODOLIST', JSON.stringify([]));
    return [];
};

export const removeItemFromLocalStorage = (id) => {
    const itemsData = JSON.parse(localStorage.getItem('TODOLIST'));
    const newData = itemsData.filter((item) => item.id != id);
    localStorage.setItem('TODOLIST', JSON.stringify(newData));
};

export const changeDoneStatus = (id, value) => {
    const itemsData = JSON.parse(localStorage.getItem('TODOLIST'));
    const newData = itemsData.map((item) => {
       if (id == item.id) {
        return {...item, isDone: value};
       } 
       return item;
    });
    localStorage.setItem('TODOLIST', JSON.stringify(newData));
};

export const getAllData = () => {
    return JSON.parse(localStorage.getItem('TODOLIST'));
};

export const clearLocalStorageList = () => {
    localStorage.setItem('TODOLIST', JSON.stringify([]));
};