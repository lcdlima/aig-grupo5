import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../CSS/MainPurchase.css';
import { userData, clearTemporaryData } from '../actions/index';

const user = JSON.parse(localStorage.getItem('user'));

class MainPurchase extends Component {
  setUserDataToCart(obj, text) {
    if(text === "none") {
      localStorage.setItem('dataToPurchase', JSON.stringify([obj]));
      return
    }
    const oldData = JSON.parse(localStorage.getItem('dataToPurchase') || '[]');
    localStorage.setItem('dataToPurchase', JSON.stringify([...oldData, obj]));
  }

  componentDidMount() {
    const { data, temporaryData, saveUserData, clearInProgress } = this.props;
    const allDataOnLS=  JSON.parse(localStorage.getItem('usersData') || '[]');
    // const objInLocalStorage = allDataOnLS.some((elem) => elem.email === user.log);
    // const objInStore = data.some((elem) => elem.email === user.log);
    // if (!temporaryData) this.setUserSellDataWithRedux(temporaryData);
    // if (data) this.setUserSellDataWithLS(data);
    const objTolocalStorage = {
      id: temporaryData.id,
      email: temporaryData.email,
      nome: temporaryData.name,
      birth: temporaryData.birthDay,
      address: {
        cep: temporaryData.CEP,
        number: temporaryData.adressNumber,
        complement: temporaryData.complement,
      },
      card: {
        number: temporaryData.cardName,
        cvv: temporaryData.cardNumber,
        cardHolder: temporaryData.CVV,
        dueDate: temporaryData.dueDate,
      },
    };
    if (allDataOnLS.length > 0 && temporaryData.email !== '') {
      const newData = [...allDataOnLS, temporaryData];
      localStorage.setItem('usersData', JSON.stringify(newData));
      this.setUserDataToCart(objTolocalStorage, "some")
      // saveUserData(newData);
    }
    if (allDataOnLS.length < 1 && temporaryData.email !== '') {
      localStorage.setItem('usersData', JSON.stringify([temporaryData]));
      this.setUserDataToCart(objTolocalStorage, "none")
      // saveUserData(temporaryData);
    }
  }

  renderindividualButton() {
    return (
      <div className="conteinerButtonMP">
        <Link to="/products-list">
          <button
            className="ButtonMainPurchase"
            type="button"
          >
            Individual
          </button>
        </Link>
      </div>
    );
  }

  renderGroupButton() {
    return (
      <div className="conteinerButtonMP">
        <Link to="/event-choice">
          <button
            className="ButtonMainPurchase"
            type="button"
          >
            Grupo
          </button>
        </Link>
      </div>
    );
  }

  renderBackToPerfilButton() {
    return (
      <div className="conteinerButtonMP">
        <Link to="/Perfil">
          <button
            className="ButtonMainPurchase"
            type="button"
          >
            Ir Para Perfil
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="conteinerMainPurchase">
        {this.renderindividualButton()}
        {this.renderGroupButton()}
        {this.renderBackToPerfilButton()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // saveUserData: (obj) => dispatch(userData(obj)),
  clearInProgress: () => dispatch(clearTemporaryData()),
});

const mapStateToProps = (state) => ({
  // data: state.finishedUserData,
  temporaryData: state.inProgressRegister,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPurchase);

MainPurchase.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  temporaryData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
