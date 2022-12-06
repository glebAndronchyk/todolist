// eslint-disable-next-line import/prefer-default-export
export class Empty {
  constructor(list) {
    this.parent = list;
    this.item = document.createElement('tr');
    this.empty = document.createElement('td');
    this.DOMEmpty = document.querySelector('#empty');
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
      // empty.parent.classList.remove('centered');
      this.DOMEmpty.remove();
    }
  }
}
