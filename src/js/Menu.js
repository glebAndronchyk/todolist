export default class Menu {
  constructor() {
    this.open = document.querySelector('.hamburger');
    this.close = document.querySelector('.close-hamburger');
    this.overlay = document.querySelector('.overlay');
    this.menu = document.querySelector('.control-panel');
  }

  openMenu() {
    this.menu.classList.add('opened');
    this.overlay.classList.add('visible');
    this.overlay.addEventListener('click', this.closeMenu.bind(this));
  }

  closeMenu() {
    this.menu.classList.remove('opened');
    this.overlay.classList.remove('visible');
    this.overlay.removeEventListener('click', this.closeMenu);
  }

  addListeners() {
    this.open.addEventListener('click', this.openMenu.bind(this));
    this.close.addEventListener('click', this.closeMenu.bind(this));
  }
}
