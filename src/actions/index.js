export const SAVE_USER_EMAIL_AND_PASSWORD = 'SAVE_USER_EMAIL_AND_PASSWORD';

export const SAVE_USER_REGISTRY_AND_ADRESS = 'SAVE_USER_REGISTRY_AND_ADRESS';

export const SAVE_USER_CARD = 'SAVE_USER_CARD';

export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const CLEAR_LOGIN_INFO = 'CLEAR_LOGIN_INFO';

export const SAVE_TEMPORARY_EVENT = 'SAVE_TEMPORARY_EVENT';

export const CLEAR_TEMPORARY_EVENT = 'CLEAR_TEMPORARY_EVENT';

export const EVENT_CHOOSED = 'EVENT_CHOOSED';

const increase = (id) => ({
  type: 'INCREASE_CART',
  id,
});

const decrease = (id) => ({
  type: 'DECREASE_CART',
  id,
});

const sendToCart = (id, total) => ({
  type: 'SEND_TO_CART',
  id,
  total,
});

const switchPackage = (id, e) => ({
  type: 'MODIFY_PACKAGE',
  id,
  e,
});

const increaseToCart = (id) => ({
  type: 'INCREASE_FINAL_CART',
  id,
});

const decreaseToCart = (id) => ({
  type: 'DECREASE_FINAL_CART',
  id,
});

const removeFromCart = (id) => ({
  type: 'REMOVE_ITEM',
  id,
});

const changeInput = (id, total) => ({
  type: 'CHANGE_INPUT',
  id,
  total,
});

const sortProducts = () => ({
  type: 'SORT_PRODUCTS',
});

const selectDelivery = () => ({
  type: 'SELECT_DELIVERY',
});

const selectCollect = () => ({
  type: 'SELECT_COLLECT',
});

export const chooseEvent = (event) => ({
  type: EVENT_CHOOSED,
  event,
});

export const userData = (obj) => ({
  type: SAVE_USER_EMAIL_AND_PASSWORD,
  obj,
});

export const userEmailAndPassword = (email, password) => ({
  type: SAVE_USER_EMAIL_AND_PASSWORD,
  email,
  password,
});

export const userRegisterAndPassword = (
  name, CPF, birthDay, code, phone, CEP, street, adressNumber, complement, city,
) => ({
  type: SAVE_USER_REGISTRY_AND_ADRESS,
  name,
  CPF,
  birthDay,
  code,
  phone,
  CEP,
  street,
  adressNumber,
  complement,
  city,
});

export const userCard = (cardName, cardNumber, dueDate, CVV) => ({
  type: SAVE_USER_CARD,
  cardName,
  cardNumber,
  dueDate,
  CVV,
});

export const clearTemporaryData = () => ({
  type: CLEAR_LOGIN_INFO,
});

export const temporaryEventData = (obj) => ({
  type: SAVE_TEMPORARY_EVENT,
  obj,
});

export const clearTemporaryEvent = () => ({
  type: CLEAR_TEMPORARY_EVENT,
});

export {
  increase, decrease, sendToCart, switchPackage, decreaseToCart, increaseToCart, removeFromCart, changeInput, sortProducts, selectDelivery, selectCollect,
};
