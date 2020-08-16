import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import productList from '../services/productList';

const user = JSON.parse(localStorage.getItem('user'));
const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed'));

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      individualClicked: false,
      groupClicked: false,
      preservedClicked: false,
      moneyClicked: false,
      purchase: [],
    };
  }

  componentDidMount() {
    this.setState({ name: user.name, email: user.email });
    const purchase = shopstore.reduce((arr, e) => {
      if (e.buyerId === user.log) {
        return [...arr, e.id_compra];
      } return arr;
    }, []);
    this.setState({ purchase });
  }

  renderPerfilHeader() {
    const { name } = this.state;
    return (
      <div>
        <img src="" alt="avatar" />
        <h2>{name}</h2>
      </div>
    );
  }

  renderIndividualPurchase() {
    const { individualClicked, purchase } = this.state;
    return (
      <div
        onClick={() => this.setState({ individualClicked: !individualClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(individualClicked) ? '⌄' : '›'}</h2>
        <h2>Meus Pedidos</h2>
        {purchase.map((e, i) => (
          <div>
            <h2>{`Compra ${i + 1}`}</h2>
            <div>
              {shopstore.filter((el) => el.id_compra === e)[0].cart.map((ell) => {
                const products = (productList.filter((elll) => elll.id === ell.id)[0]);
                return (
                  <div className="make-flex">
                    <p>{products.productName}</p>
                    <img width="40px" src={products.thumbnail} />
                    <p>{`Quantidade: ${ell.total}`}</p>
                  </div>
                );
              })}

            </div>
          </div>
        ))}
        {}
      </div>
    );
  }

  renderGroupPurchase() {
    const { groupClicked } = this.state;
    return (
      <div
        onClick={() => this.setState({ groupClicked: !groupClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(groupClicked) ? '⌄' : '›'}</h2>
        <h2>Meus Eventos</h2>
        {}
      </div>
    );
  }

  renderPreservedNature() {
    const { preservedClicked } = this.state;
    return (
      <div
        onClick={() => this.setState({ preservedClicked: !preservedClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(preservedClicked) ? '⌄' : '›'}</h2>
        <h2>Quantidade Preservada</h2>
        {}
      </div>
    );
  }

  renderMoneySaved() {
    const { moneyClicked } = this.state;
    return (
      <div
        onClick={() => this.setState({ moneyClicked: !moneyClicked })}
      >
        {/* <img src={} alt="arrow" /> */}
        <h2>{(moneyClicked) ? '⌄' : '›'}</h2>
        <h2>Dinheiro Economizado</h2>
        {}
      </div>
    );
  }

  renderPerfilFooter() {
    return (
      <div>
        <Link to="/mainPurchase">Nova compra</Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPerfilHeader()}
        {this.renderIndividualPurchase()}
        {this.renderGroupPurchase()}
        {this.renderPreservedNature()}
        {this.renderMoneySaved()}
        {this.renderPerfilFooter()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.finishedUserData,
});

export default connect(mapStateToProps, null)(Perfil);

Perfil.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
