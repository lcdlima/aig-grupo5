import React from 'react'
import { connect } from 'react-redux';
import { finalValue } from './Cart'

function Payment(props) {
  const { cartItems } = props;
  return (
    <div>
      <p>{`Valor a pagar ${finalValue(cartItems)}`}</p>
    </div>
  );
}

const mapStateToProps = state => ({
  cartItems: state.FinalCartReducer,
})

export default connect(mapStateToProps)(Payment);
