import '../scss/app.scss';
import { LocalStorage } from './localStorage';
import { RenderTasksList } from './RenderTL';
import { Filters } from './Filters';
import { Menu } from './Menu';
// eslint-disable-next-line import/no-cycle
import { Form } from './Form';

export const storage = new LocalStorage();
const DATA = storage.init();
export const render = new RenderTasksList(DATA);
render.renderList(DATA);
export const filters = new Filters();
filters.addListeners();
export const menu = new Menu();
menu.addListeners();
export const form = new Form();
form.addListener();
