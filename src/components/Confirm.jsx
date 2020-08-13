import React from 'react';
import { connect } from 'react-redux';
import BackToProductsList from './BackToProductsList';
import { calculateDiscount, calculatePlasticSaved } from './Cart';


function Confirm(props) {
  const { packageTotal } = props;
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
      </div>
      <div className="footer">
        <BackToProductsList />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  packageTotal: state.PackageReducer,
});

export default connect(mapStateToProps)(Confirm);
