import '../scss/app.scss';
import {
  setDataToLocalStorage, initLocalStorage, removeItemFromLocalStorage, changeDoneStatus, getAllData, clearLocalStorageList,
} from './localStorage';

import { RenderTasksList } from './RenderTL';
// eslint-disable-next-line import/no-cycle
import { Form } from './Form';
import { Menu } from './Menu';

const DATA = initLocalStorage();
export const render = new RenderTasksList(DATA);
render.renderList();
export const form = new Form();
form.addListener();
export const menu = new Menu();
menu.addListeners(menu);
