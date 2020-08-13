import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateDiscount, finalValue } from './Cart';
import '../CSS/Payment.css';
import { purchaseFinished } from '../store';

function Payment(props) {
  const { cartItems, packageTotal } = props;
  const discount = calculateDiscount(packageTotal);
  return (
    <div>
      <div className="products-page-nav">
        <p>logo</p>
        <h1>Pagamento</h1>
        <div />
      </div>
      <div className="container">
        <p>{`Valor a pagar ${finalValue(cartItems) - discount}`}</p>
        <div>
          <div>
            <h2>Detalhes do Pagamento</h2>
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
          <div>
            <h2>Detalhes da Entrega</h2>
            <label htmlFor="address-check">
              Usar dados de cadastro
              <input id="address-check" type="checkbox" />
            </label>
            <p>Endereço</p>
            <div className="address-field">
              <input type="number" placeholder="cep" />
              <input type="text" placeholder="rua" />
              <div className="address-number">
                <input type="number" placeholder="número" />
                <input type="text" placeholder="complemento" />
              </div>
              <input type="text" placeholder="bairro" />
              <div>
                <input type="text" placeholder="cidade" />
                <input type="text" placeholder="estado" />
              </div>
            </div>
          </div>
        </div>
        <Link to="/confirm"><button onClick={() => purchaseFinished()} type="button">Finalizar Compra</button></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.FinalCartReducer,
  packageTotal: state.PackageReducer,
});

export default connect(mapStateToProps)(Payment);
