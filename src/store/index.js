import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer);

window.addEventListener('load', () => {
  let id = JSON.parse(localStorage.getItem('userID'));
  if (id === '' || id === undefined) {
    localStorage.setItem('userID', 0);
  } else {
    id += 1;
    localStorage.setItem('userID', id);
  }
});

const storage = JSON.parse(localStorage.getItem('temporaryStorage'));
if (storage === null) { localStorage.setItem('temporaryStorage', JSON.stringify([{ cart: [] }])); }

export const updateLocalStorage = () => {
  const cartReducer = { cart: store.getState().FinalCartReducer };
  localStorage.setItem('temporaryStorage', JSON.stringify([cartReducer]));
};

export const purchaseFinished = () => {
  const id = JSON.parse(localStorage.getItem('userID'));
  const cartReducer = { id_compra: id, cart: store.getState().FinalCartReducer };
  let cartLocalStorage = JSON.parse(localStorage.getItem('purchaseFineshed'));
  if (cartLocalStorage === '' || !cartLocalStorage) {
    localStorage.setItem('purchaseFineshed', JSON.stringify([cartReducer]));
  } else {
    cartLocalStorage = cartLocalStorage.filter((e) => e.id_compra !== id);
    localStorage.setItem('purchaseFineshed', JSON.stringify([...cartLocalStorage, cartReducer]));
  }
};

export default store;
