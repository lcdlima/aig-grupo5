import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateDiscount, finalValue } from './Cart';
import '../CSS/Payment.css';
import { purchaseFinished } from '../store';
import BackToProductsList from './BackToProductsList';
import user from '../images/user.svg';
import MapComponent from './MapComponent';
import logo from '../images/logo.svg';

function Payment(props) {
  const { packageTotal, isDelivery } = props;
  const items = JSON.parse(localStorage.getItem('temporaryStorage'))[0].cart;
  const discount = calculateDiscount(packageTotal);
  let deliverfee;
  if (isDelivery) { deliverfee = 3; } else { deliverfee = 0; }
  return (
    <div>
      <div className="products-page-nav">
        <div><img src={logo} alt="" width="100px" /></div>
        <h1>Pagamento</h1>
        <div />
      </div>
      <div className="container">
        <div>
          <div>
            <h2>Detalhes do Pagamento</h2>
            <div className="price">
              <p>Valor a pagar </p>
              <p>{`${(finalValue(items) - discount + deliverfee).toFixed(2)}`}</p>
            </div>
            <p>Dados do Cartão</p>
            <label htmlFor="card-check">
              Usar dados de cadastro
              <input id="card-check" type="checkbox" />
            </label>
            <br />
            <div className="card-field">
              <input type="text" placeholder="nome do comprador" />
              <input type="number" placeholder="numero do cartao" />
              <div className="card-details">
                <input type="month" min="2020-08" placeholder="data de vencimento" />
                <input type="text" placeholder="cvv" />
              </div>
            </div>
          </div>
        </div>
        <Link to="/confirm"><button onClick={() => purchaseFinished()} type="button">Finalizar Compra</button></Link>
      </div>
      <div>
        <p>Encontre o ponto de coleta mais próximo de você</p>
        <MapComponent />
      </div>
      <div className="footer">
        <BackToProductsList />
        <Link to="/Perfil"><img src={user} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.FinalCartReducer,
  packageTotal: state.PackageReducer,
  isDelivery: state.CollectionReducer.isDelivery,
});

export default connect(mapStateToProps)(Payment);
