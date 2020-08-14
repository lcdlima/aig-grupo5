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

export {
  increase, decrease, sendToCart, switchPackage, decreaseToCart, increaseToCart, removeFromCart, changeInput, sortProducts, selectDelivery, selectCollect,
};
