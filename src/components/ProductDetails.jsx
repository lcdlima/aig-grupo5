import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productList from '../services/productList';
import { decrease, increase, sendToCart } from '../actions/index';
import { getTotalCart } from './ProductsPage'

function renderIncrementButton(id, props) {
  const { initialState, decrement, increment, addToCart } = props;
  const total = initialState.filter((e) => e.id === Number(id))[0].amount;
  return (
    <div>
      <div className="increment-buttons">
        <button onClick={() => { console.log(id); decrement(id) }}>-</button>
        <p>{total}</p>
        <button onClick={() => increment(id)}>+</button>
      </div>
      <button onClick={() => addToCart(id, total)} disabled={(total > 0) ? false : true}>Adicionar ao Carrinho</button>
    </div>
  );
}

function ProductDetails(props) {
  const { props: { match: { params: { id } } }, cartState } = props;
  const product = productList.filter((e) => e.id === Number(id));
  return (
    <div>
      <div>
        <p>{`Produtos no Carrinho: ${getTotalCart(cartState)}`}</p>
        <h1>{product[0].productName}</h1>
        <img src={product[0].thumbnail} width="300px" alt="" />
        <p>{product[0].originalPrice}</p>
        <p>Com a embalagem retornável você paga</p>
        <p>{product[0].discountPrice}</p>
      </div>
      {renderIncrementButton(id, props)}
      <Link to="/products-list"><button type="button">Voltar</button></Link>
      <Link to="/cart"><button>Ir ao Carrinho!</button></Link>
    </div>
  );
}

const mapStateToPros = state => ({
  initialState: state.CartReducer,
  cartState: state.FinalCartReducer,
})

const mapDispatchToProps = dispatch => ({
  decrement: (id) => dispatch(decrease(id)),
  increment: (id) => dispatch(increase(id)),
  addToCart: (id, total) => dispatch(sendToCart(id, total)),
})

export default connect(mapStateToPros, mapDispatchToProps)(ProductDetails);