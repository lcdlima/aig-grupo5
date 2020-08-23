import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import packageList from '../services/packageList';
import userchar from '../images/user.svg';
import logo from '../images/logo.svg';
import ResumeCard from './ResumeCard';
import ResumeGroupCard from './ResumeGroupCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown, faHome } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Perfil.css';

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
      purchaseGroup: [],
      shopstore: [],
      obj: {},
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({ name: user.name, email: user.log });
    const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed')) || [];
    const purchase = shopstore.reduce((arr, e) => {
      if (e.buyerId === user.log) {
        return [...arr, e.id_compra];
      } return arr;
    }, []);
    const shopstoreGroup = JSON.parse(localStorage.getItem('storedEvents')) || [];
    const purchaseGroup = shopstoreGroup.reduce((arr, first) => {
      const existIn = first.participants.some((second) => second.log === user.log);
      if (existIn) {
        return [...arr, first.id];
      }
      return arr;
    }, []);
    let obj = {purchaseGroup};
    purchase.forEach((e) => obj = { ...obj, [e]: false });
    this.setState({ purchase, shopstore, obj, purchaseGroup });
  }

  renderPerfilHeader() {
    return (
      <div className="products-page-nav">
        <Link to="/aig-grupo5/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
      </div>
    );
  }

  renderIndividualPurchase() {
    const {
      individualClicked, purchase, shopstore, obj,
    } = this.state;
    let arrInvidualResume = []
    if (purchase.length > 4) {
      arrInvidualResume = purchase.reduce((arr, elem, index) => {
        if(index > (purchase.length - 5)) {
          return [...arr, elem.id_compra];
        }
        return arr;
      },[]);
    } else {
      arrInvidualResume = purchase;
    }
    return (
      <div className="perfil-principal-div">
        <div className="perfil-make-flex">
          {individualClicked && <FontAwesomeIcon icon={faCaretDown} size="2x" />}
          {!individualClicked && <FontAwesomeIcon icon={faCaretRight} size="2x" />}
          <h2 onClick={() => this.setState(
            { individualClicked: !individualClicked }
          )}
          >
            Meus Pedidos
          </h2>
        </div>
        {individualClicked && <ResumeCard purchaseList={arrInvidualResume} />}
      </div>
    );
  }

  renderGroupPurchase() {
    const { groupClicked, purchaseGroup } = this.state;
    let arrGroupResume = [];
    if (purchaseGroup.length > 4) {
      arrGroupResume = purchaseGroup.reduce((arr, elem, index) => {
        if(index > (purchaseGroup.length - 5)) {
          return [...arr, elem.id_compra];
        }
        return arr;
      },[]);
    } else {
      arrGroupResume = purchaseGroup;
    }
    return (
      <div
        className="perfil-principal-div"
        onClick={() => this.setState({ groupClicked: !groupClicked })}
      >
        <div className="perfil-make-flex">
          {groupClicked && <FontAwesomeIcon icon={faCaretDown} size="2x" />}
          {!groupClicked && <FontAwesomeIcon icon={faCaretRight} size="2x" />}
          <h2>Meus Eventos</h2>
        </div>
        {groupClicked && <ResumeGroupCard purchaseList={purchaseGroup} />}
      </div>
    );
  }

  renderPreservedNature() {
    const { preservedClicked, purchase, shopstore } = this.state;
    return (
      <div
        className="perfil-principal-div"
        onClick={() => this.setState({ preservedClicked: !preservedClicked })}
      >
        <div className="perfil-make-flex">
          {preservedClicked && <FontAwesomeIcon icon={faCaretDown} size="2x" />}
          {!preservedClicked && <FontAwesomeIcon icon={faCaretRight} size="2x" />}
          <h2>Consumo reduzido</h2>
        </div>
        <div className="text-perfil">
          {preservedClicked && `${purchase.reduce((summ, e) => {
            const packages = shopstore.filter((el) => el.id_compra === e)[0].pack;
            const total = packages.reduce((sum, ell) => {
              return sum + (packageList.filter((elll) => elll.id === ell.id)[0].weight * Number(ell.total))}, 0);
            return summ + total;
          }, 0)}g de plástico reduzido`}
        </div>
      </div>
    );
  }

  renderMoneySaved() {
    const { moneyClicked, shopstore, purchase } = this.state;
    return (
      <div
        className="perfil-principal-div"
        onClick={() => this.setState({ moneyClicked: !moneyClicked })}
      >
        <div  className="perfil-make-flex">
          {moneyClicked && <FontAwesomeIcon icon={faCaretDown} size="2x" />}
          {!moneyClicked && <FontAwesomeIcon icon={faCaretRight} size="2x" />}
          <h2>Quantidade economizada</h2>
        </div>
        <div className="text-perfil">
          {moneyClicked && `R$${(purchase.reduce((summ, e) => {
            const packages = shopstore.filter((el) => el.id_compra === e)[0].pack;
            const total = packages.reduce((sum, ell) => {
              return sum + (packageList.filter((elll) => elll.id === ell.id)[0].price * Number(ell.total))
            }, 0);
            return summ + total;
          }, 0)).toFixed(2)} economizados`}
        </div>
      </div>
    );
  }

  renderPerfilFooter() {
    return (
      <div className="footer" style={{height: "50px"}}>
        <div />
      </div>
    );
  }

  render() {
    const { name } = this.state;
    return (
      <div className="container">
        {this.renderPerfilHeader()}
      <div className="conteiner-perfil">
        <div className="sub-container">
          <h4>{`Olá ${name}`}</h4>
          {this.renderIndividualPurchase()}
          {this.renderGroupPurchase()}
          {this.renderPreservedNature()}
          {this.renderMoneySaved()}
        </div>
        {this.renderPerfilFooter()}
      </div>
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
