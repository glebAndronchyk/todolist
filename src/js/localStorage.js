// eslint-disable-next-line import/prefer-default-export
export class LocalStorage {
  constructor() {
    this.storage = window.localStorage;
  }

  init() {
    if (this.storage.getItem('TODOLIST')) {
      return JSON.parse(this.storage.getItem('TODOLIST'));
    }
    this.storage.setItem('TODOLIST', JSON.stringify([]));
    return [];
  }

  setData(tasks) {
    const items = JSON.parse(this.storage.getItem('TODOLIST'));
    const newData = [...items, tasks];
    this.storage.setItem('TODOLIST', JSON.stringify(newData));
  }

  removeItem(id) {
    const itemsData = JSON.parse(this.storage.getItem('TODOLIST'));
    const newData = itemsData.filter((item) => item.id !== id);
    this.storage.setItem('TODOLIST', JSON.stringify(newData));
  }

  changeStatus(id, value) {
    const itemsData = JSON.parse(this.storage.getItem('TODOLIST'));
    const newData = itemsData.map((item) => {
      if (id === item.id) {
        // console.log({ ...item, isDone: value });
        return { ...item, isDone: value };
      }
      return item;
    });
    this.storage.setItem('TODOLIST', JSON.stringify(newData));
  }

  get getAll() {
    return JSON.parse(this.storage.getItem('TODOLIST'));
  }

  clearStorage() {
    this.storage.setItem('TODOLIST', JSON.stringify([]));
  }
}
