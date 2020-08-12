import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import productList from '../services/productList';
import { switchPackage } from '../actions/index';

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

function Cart(props) {
  const { cartItems, alterPackage } = props;
  return (
    <div>
      <h1>Carrinho</h1>
      <div>
        {cartItems.map((e) => {
          const product = productList.filter((el) => el.id === Number(e.id));
          return (
            <div>
              <p>{product[0].productName}</p>
              <img src={product[0].thumbnail} width="50px" alt="" />
              <p>{e.total}</p>
              <p>{e.pack ? product[0].discountPrice : product[0].originalPrice}</p>
              <p>
                total:
                {`${e.pack ? e.total * product[0].discountPrice : e.total * product[0].originalPrice}`}
              </p>
              <label htmlFor="check">
                Possui Embalagem?
                <input id="check" type="checkbox" onChange={() => alterPackage(e.id)} checked={e.pack} />
              </label>
            </div>
          );
        })}
      </div>
      <div>
        <p>{`Valor Final da Compra: ${finalValue(cartItems)} `}</p>
        <Link to="/payment"><button type="button">Finalizar Pedido</button></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.FinalCartReducer,
  pack: state.FinalCartReducer,
});

const mapDispatchToProps = (dispatch) => ({
  alterPackage: (id) => dispatch(switchPackage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
