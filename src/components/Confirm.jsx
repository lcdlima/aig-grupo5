import React from 'react';
import { connect } from 'react-redux';
import BackToProductsList from './BackToProductsList';
import { calculateDiscount, calculatePlasticSaved } from './Cart';
import productList from '../services/productList';

function getNewDrink() {
  const cartState = (JSON.parse(localStorage.getItem('temporaryStorage')))[0].cart;
  const consumedProducts = cartState.map((e) => e.id);
  const notConsumedProducts = productList.filter((e) => !consumedProducts.includes(e.id));
  const randomNumber = notConsumedProducts.length;
  const random = Math.floor(Math.random() * randomNumber);
  const randomProduct = notConsumedProducts[random];
  return (
    <div className="products-list">
      <p>{randomProduct.productName}</p>
      <img src={randomProduct.thumbnail} width="100px" alt="" />
      <p>Seu brinde estará disponível em sua próxima compra</p>
    </div>
  );
}

function renderGift() {
  return (
    <div className="products-list">
      <p>Parabéns! Você já deixou de gerar 1kg de plástico! Que tal um brinde pra comemorar?</p>
      {getNewDrink()}
    </div>
  );
}

function Confirm(props) {
  const { packageTotal } = props;
  const id = localStorage.getItem('userID');
  const discount = calculateDiscount(packageTotal);
  const plasticSaved = calculatePlasticSaved(packageTotal);
  return (
    <div>
      <div className="products-page-nav">
        <div />
        <div />
      </div>
      <div className="container">
        <div className="final-message">
          <h1>Compra Realizada!</h1>
          <p>{`Você economizou R$ ${discount}`}</p>
          <p>{`Você reduziu seu consumo de plástico em ${plasticSaved} g`}</p>
          <p>Obrigado por fazer um mundo melhor!</p>
        </div>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`} alt="" />
        {(discount > 10) && renderGift()}
      </div>
      <div className="footer">
        <BackToProductsList />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  packageTotal: state.PackageReducer,
  cartItems: state.FinalCartReducer,
});

export default connect(mapStateToProps)(Confirm);
