import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../CSS/MainPurchase.css';
import { userData, clearTemporaryData } from '../actions/index';


class MainPurchase extends Component {
  componentDidMount() {
    const { data, temporaryData, saveUserData, clearInProgress } = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    const allDataOnLS = JSON.parse(localStorage.getItem('usersData') || '[]');
    const objInLocalStorage = allDataOnLS.some((elem) => elem.email === user.log);
    const objInStore = data.some((elem) => elem.email === user.log);
    if (!objInLocalStorage && !objInStore && allDataOnLS.length === 0) {
      localStorage.setItem('usersData', JSON.stringify([temporaryData]));
      saveUserData(temporaryData);
      this.setState({ name: temporaryData.name, email: temporaryData.email});
    }
    if (!objInLocalStorage && !objInStore && allDataOnLS.length > 0) {
      const newData = [...allDataOnLS, temporaryData];
      localStorage.setItem('usersData', JSON.stringify(newData));
      saveUserData(temporaryData);
      this.setState({ name: temporaryData.name, email: temporaryData.email});
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
