const { type } = require("os")

const increase = (id) => ({
  type: 'INCREASE_CART',
  id,

})

const decrease = (id) => ({
  type: 'DECREASE_CART',
  id,

})

const sendToCart = (id, total) => ({
  type: 'SEND_TO_CART',
  id,
  total,

})

const switchPackage = (id) => ({
  type: 'MODIFY_PACKAGE', 
  id,
})

export { increase, decrease, sendToCart, switchPackage };
