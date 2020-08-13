import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productList from '../services/productList';
import packageList from '../services/packageList';
import {
  switchPackage, decreaseToCart, increaseToCart, removeFromCart, changeInput,
} from '../actions/index';
import '../CSS/Cart.css';
import BackToProductsList from './BackToProductsList';
import { updateLocalStorage } from '../store';

export function calculateDiscount(packageTotal) {
  return packageTotal.reduce((sum, e) => sum + (packageList.filter((el) => e.id === el.id)[0].price) * e.total, 0);
}

export function calculatePlasticSaved(packageTotal) {
  return packageTotal.reduce((sum, e) => sum + (packageList.filter((el) => e.id === el.id)[0].weight) * e.total, 0);
}

export function finalValue(cartItems) {
  return cartItems.reduce((sum, e) => {
    const product = productList.filter((el) => el.id === Number(e.id));
    let total;
    if (e.pack) {
      total = product[0].discountPrice * e.total;
    } else {
      total = product[0].originalPrice * e.total;
    }
    return sum + total;
  }, 0);
}

// function renderIncrementButton(id, props) {
//   const {
//     initialState, decrement, increment, deleteProduct,
//   } = props;
//   const { total } = initialState.filter((e) => e.id === Number(id))[0];
//   return (
//     <div>
//       <div className="increment-buttons">
//         <button type="button" onClick={() => {decrement(id); updateLocalStorage()}}>-</button>
//         <p>{total}</p>
//         <button type="button" onClick={() => {increment(id); updateLocalStorage()}}>+</button>
//       </div>
//       <button onClick={() => {deleteProduct(id); updateLocalStorage()}} type="button">X</button>
//     </div>
//   );
// }

function renderIncrementButton(id, props) {
  const {
    initialState, decrement, increment, deleteProduct,
  } = props;
  const items = JSON.parse(localStorage.getItem('temporaryStorage'));
  const { total } = items[0].cart.filter((e) => e.id === Number(id))[0];
  return (
    <div>
      <div className="increment-buttons">
        <button type="button" onClick={() => { decrement(id); updateLocalStorage(); }}>-</button>
        <p>{total}</p>
        <button type="button" onClick={() => { increment(id); updateLocalStorage(); }}>+</button>
      </div>
      <button onClick={() => { deleteProduct(id); updateLocalStorage(); }} type="button">X</button>
    </div>
  );
}

function Cart(props) {
  const {
    cartItems, alterPackage, changeInput, packageTotal,
  } = props;
  const items = JSON.parse(localStorage.getItem('temporaryStorage'));
  const purchaseTotal = finalValue(cartItems);
  const discount = calculateDiscount(packageTotal);
  const finalPrice = purchaseTotal - discount;
  return (
    <div>
      <div className="products-page-nav">
        <div>logo</div>
        <h1>Carrinho</h1>
        <div />
      </div>
      <div className="container">
        <div className="products-container">
          {items[0].cart.map((e) => {
            const product = productList.filter((el) => el.id === Number(e.id));
            return (
              <div className="products-list">
                <p>{product[0].productName}</p>
                <img src={product[0].thumbnail} width="50px" alt="" />
                <p>{e.total}</p>
                <p>{product[0].originalPrice}</p>
                <p>
                  total:
                  {`${e.total * product[0].originalPrice}`}
                </p>
                {renderIncrementButton(e.id, props)}
              </div>
            );
          })}
          {/* {cartItems.map((e) => {
            const product = productList.filter((el) => el.id === Number(e.id));
            return (
              <div className="products-list">
                <p>{product[0].productName}</p>
                <img src={product[0].thumbnail} width="50px" alt="" />
                <p>{e.total}</p>
                <p>{product[0].originalPrice}</p>
                <p>
                  total:
                  {`${e.total * product[0].originalPrice}`}
                </p>
                {renderIncrementButton(e.id, props)}
              </div>
            );
          })} */}
        </div>
        <div>
          <div>
            <p>Deseja retornar Embalagens?</p>
            <div className="input-label">
              <p>Embalagem de 2L</p>
              <input onChange={(e) => changeInput(1, e.target.value)} type="number" value={packageTotal.filter((e) => e.id === 1)[0].total} />
            </div>
            <div className="input-label">
              <p>Embalagem de 1L</p>
              <input onChange={(e) => changeInput(2, e.target.value)} type="number" value={packageTotal.filter((e) => e.id === 2)[0].total} />
            </div>
            <div className="input-label">
              <p>Embalagem de 0.5L</p>
              <input onChange={(e) => changeInput(3, e.target.value)} type="number" value={packageTotal.filter((e) => e.id === 3)[0].total} />
            </div>
          </div>
          <p>{`Desconto com retorno das embalgens: ${discount}`}</p>
          <p>{`Valor Final da Compra: ${finalPrice} `}</p>
          <Link to="/payment"><button type="button" disabled={((finalPrice < 0))}>Finalizar Pedido</button></Link>
        </div>
      </div>
      <div className="footer">
        <BackToProductsList />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  initialState: state.FinalCartReducer,
  cartItems: state.FinalCartReducer,
  packageTotal: state.PackageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  alterPackage: (id, e) => dispatch(switchPackage(id, e)),
  decrement: (id) => dispatch(decreaseToCart(id)),
  increment: (id) => dispatch(increaseToCart(id)),
  deleteProduct: (id) => dispatch(removeFromCart(id)),
  changeInput: (id, total) => dispatch(changeInput(id, total)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
