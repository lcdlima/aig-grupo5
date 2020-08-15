import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { userCard } from '../../actions/index';
import '../../CSS/ThirdPart.css';

const clickToRegister = (cardName, cardNumber, dueDate, CVV, saveCard, history, temporaryData) => {
  saveCard(cardName, cardNumber, dueDate, CVV);
  localStorage.setItem('user', JSON.stringify(
    {
      log: temporaryData.email,
      name: temporaryData.name,
      id: temporaryData.id,
    }
  ));
  history.push("/mainPurchase");
}

const renderCardNameInput = (cardName, setCardName) => {
  return (
    <div className="conteinerCardNameTP">
      <label htmlFor="cardName">Nome</label>
      <input
        type="text"
        id="cardName"
        value={cardName}
        onChange={(elem) => setCardName(elem.target.value)}
        required
      />
    </div>
  );
}

const renderCardNumberInput = (cardNumber, setCardNumber) => {
  return (
    <div className="conteinerCardNumberTP">
      <label htmlFor="cardNumber">Numero do Cartão</label>
      <input
        type="number"
        id="cardNumber"
        value={cardNumber}
        onChange={(elem) => setCardNumber(elem.target.value)}
        required
        minlength="12"
        maxlength="12"
      />
    </div>
  );
}

const renderDueDateInput = (dueDate, setDueDate) => {
  return (
    <div className="conteinerDueDateTP">
      <label htmlFor="dueDate">Vencimento</label>
      <input
        type="date"
        id="dueDate"
        value={dueDate}
        onChange={(elem) => setDueDate(elem.target.value)}
        required
        min="2020-10-01"
      />
    </div>
  );
}

const renderCVVInput = (CVV, setCVV) => {
  return (
    <div className="conteinerCVVTP">
      <label htmlFor="CVV">CVV</label>
      <input
        type="number"
        id="CVV"
        value={CVV}
        onChange={(elem) => setCVV(elem.target.value)}
        required
        maxlength="3"
        minlength="3"
      />
    </div>
  );
}

const isDisabled = (cardName, cardNumber, dueDate, CVV) => {
  if (!cardName && cardNumber.length !== 16 && !dueDate && (CVV.length !== 3 || CVV.length === 4)) {
    return true;
  }
  if (!cardName && cardNumber.length === 16 && dueDate && (CVV.length === 3 || CVV.length === 4)) {
    alert("Faltando preencher o campo do nome")
  } 
  if (cardName && cardNumber.length !== 16 && dueDate && (CVV.length === 3 || CVV.length === 4)) {
    alert("Verifique o número do cartão")
  }
  if (cardName && cardNumber.length === 16 && !dueDate && (CVV.length === 3 || CVV.length === 4)) {
    alert("Falta preencher a data de vencimento")
  }
  if (cardName && cardNumber.length === 16 && dueDate && (!CVV.length === 3 || CVV.length === 4)) {
    alert("Verifir os números de segurança")
  }
  if (cardName && cardNumber.length === 16 && dueDate && (CVV.length === 3 || CVV.length === 4)) {
    return false;
  }
  return true;
}

const renderFinishButtonInput = (
  cardName, cardNumber, dueDate, CVV, saveCard, history, temporaryData
) => {
  return (
    <div className="conteinerButtonTP">
        <button
          className="buttonTP"
          type="button"
          onClick={() => clickToRegister(
            cardName, cardNumber, dueDate, CVV, saveCard, history, temporaryData,
          )}
          disabled={isDisabled(cardName, cardNumber, dueDate, CVV)}
        >
          Próximo
        </button>
    </div>
  );
}

function ThirdPart(props) {
  const { saveCard, temporaryData } = props;
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [CVV, setCVV] = useState('');
  const history = useHistory();

  return (
    <div className="conteinerCadastro3">
      <div className="headerTP"></div>
      {renderCardNameInput(cardName, setCardName)}
      {renderCardNumberInput(cardNumber, setCardNumber)}
      <div className="cityAndState">
      {renderCVVInput(CVV, setCVV)}
      {renderDueDateInput(dueDate, setDueDate)}
      </div>
      {renderFinishButtonInput(cardName, cardNumber, dueDate, CVV, saveCard, history, temporaryData)}
      <div className="footerTP"> </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveCard: (cardName, cardNumber, dueDate, CVV) => dispatch(
  userCard(cardName, cardNumber, dueDate, CVV)
  ),
});

const mapStateToProps = (state) => ({
  temporaryData: state.inProgressRegister,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPart);

ThirdPart.propTypes = {
  saveCard: PropTypes.func.isRequired,
  temporaryData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
