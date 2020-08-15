import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../CSS/MainPurchase.css';
import { userData, clearTemporaryData } from '../actions/index';

const user = JSON.parse(localStorage.getItem('user'));
const allDataOnLS=  JSON.parse(localStorage.getItem('usersData') || '[]');

class MainPurchase extends Component {
  setUserSellDataWithRedux(data) {
    const UserInfo = data.map((elem) => elem.email === user.email)
    const objTolocalStorage = {
      id: UserInfo.id,
      email: UserInfo.email,
      nome: UserInfo.name,
      birth: UserInfo.birthDay,
      address: {
        cep: UserInfo.CEP,
        number: UserInfo.adressNumber,
        complement: UserInfo.complement,
      },
      card: {
        number: UserInfo.cardName,
        cvv: UserInfo.cardNumber,
        cardHolder: UserInfo.CVV,
        dueDate: UserInfo.dueDate,
      },
    };
    localStorage.setItem('dataToPurchase', JSON.stringify([objTolocalStorage]));
  }

  setUserSellDataWithLS(temporaryData) {
    const objTolocalStorage = {
      id: user.id,
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
    localStorage.setItem('dataToPurchase', JSON.stringify([objTolocalStorage]));
  }

  componentDidMount() {
    const { data, temporaryData, saveUserData, clearInProgress } = this.props;
    const objInLocalStorage = allDataOnLS.some((elem) => elem.email === user.log);
    const objInStore = data.some((elem) => elem.email === user.log);
    if (!temporaryData) this.setUserSellDataWithRedux(temporaryData);
    if (data) this.setUserSellDataWithLS(temporaryData);
    if (!objInLocalStorage && !objInStore && allDataOnLS.length === 0) {
      localStorage.setItem('usersData', JSON.stringify([temporaryData]));
      saveUserData(temporaryData);
      this.setState({ name: temporaryData.name, email: temporaryData.email});
    }
    if (!objInLocalStorage && !objInStore && allDataOnLS.length > 0) {
      const newData = [...allDataOnLS, temporaryData];
      localStorage.setItem('usersData', JSON.stringify(newData));
      saveUserData(temporaryData);
    }
    clearInProgress();
    this.setState({ name: data.name, email: data.email});
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
  saveUserData: (obj) => dispatch(userData(obj)),
  clearInProgress: () => dispatch(clearTemporaryData()),
});

const mapStateToProps = (state) => ({
  data: state.finishedUserData,
  temporaryData: state.inProgressRegister,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPurchase);

MainPurchase.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  temporaryData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
