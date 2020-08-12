import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productList from '../services/productList';
import '../CSS/ProductsPage.css';
import { decrease, increase, sendToCart } from '../actions/index';

export function getTotalCart(cartState) {
  return cartState.reduce((sum, e) => sum + e.total, 0);
}

function renderFilter(selectedFilter, setSelectedFilter) {
  let filters = productList.reduce((arr, e) => {
    if (arr.includes(e.category)) return arr;
    return [...arr, e.category];
  }, []);
  filters = ['Todos', ...filters];
  return (
    <div>
      <p>Filtrar por Tipo de Bebida</p>
      <select onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter}>
        {filters.map((e) => <option>{e}</option>)}
      </select>
    </div>
  );
}

function renderAddButtons(id, props, setShowMessage) {
  const {
    initialState, decrement, increment, addToCart,
  } = props;
  const total = initialState.filter((e) => e.id === id)[0].amount;
  return (
    <div>
      <div className="increment-buttons">
        <button onClick={() => decrement(id)} type="button">-</button>
        <p>{total}</p>
        <button onClick={() => increment(id)} type="button">+</button>
      </div>
      <button
        type="button"
        disabled={!((total > 0))}
        onClick={() => {
          addToCart(id, total);
          setShowMessage(() => true);
          setTimeout(() => { setShowMessage(false); }, 1000);
        }}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

function filterProducts(selectedFilter, props, setShowMessage) {
  return (
    <div className="products-container">
      {(selectedFilter === 'Todos') && productList.map((e) => (
        <div>
          <Link to={`/productdetails/${e.id}`}>
            <div className="products-list">
              <img src={e.thumbnail} width="100px" alt="" />
              <p>{e.productName}</p>
              <p>{e.discountPrice}</p>
            </div>
          </Link>
          {renderAddButtons(e.id, props, setShowMessage)}
        </div>
      ))}
      {(selectedFilter !== 'Todos') && productList.filter((e) => e.category === selectedFilter)
        .map((e) => (
          <div>
            <Link to={`/productdetails/${e.id}`}>
              <div className="products-list">
                <img src={e.thumbnail} width="100px" alt="" />
                <p>{e.productName}</p>
                <p>{e.discountPrice}</p>
              </div>
            </Link>
            {renderAddButtons(e.id, props, setShowMessage)}
          </div>
        ))}
    </div>
  );
}

function ProductsPage(props) {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [showMessage, setShowMessage] = useState(false);
  const { cartState } = props;
  return (
    <div>
      <h1>Lista de Produtos</h1>
      {showMessage && <p>Produto Adcionado</p>}
      <Link to="/cart"><button type="button">Ir para o Carrinho</button></Link>
      <p>{`Produtos no Carrinho: ${getTotalCart(cartState)}`}</p>
      {renderFilter(selectedFilter, setSelectedFilter)}
      {filterProducts(selectedFilter, props, setShowMessage)}
    </div>
  );
}

const mapStateToPros = (state) => ({
  initialState: state.CartReducer,
  cartState: state.FinalCartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  decrement: (id) => dispatch(decrease(id)),
  increment: (id) => dispatch(increase(id)),
  addToCart: (id, total) => dispatch(sendToCart(id, total)),
});

export default connect(mapStateToPros, mapDispatchToProps)(ProductsPage);
