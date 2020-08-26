import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import productList from '../services/productList';
import packageList from '../services/packageList';
import userchar from '../images/user.svg';
import logo from '../images/logo.svg';
import { useParams } from 'react-router-dom';

class GroupDetail extends Component {
  renderPerfilHeader() {
    return (
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
      </div>
    );
  }

  renderListOfProducts(arr, user) {
    const anyProduct = arr.some((e) => e.user.log === user.log);
    if (!anyProduct) return <p>Nenhum produto foi comprado até o momento</p>
    return (
      <div className="products">
        <h4>Produtos comprados:</h4>
        {arr.map((e) => {
          const product = productList.filter((el) => el.id === Number(e.id));
          if ( e.user.log === user.log ) {
            console.log(e)  
            return (
                <div className="products-cart-list">
                <div>
                    <img src={product[0].thumbnail} width="50px" alt="" />
                    <p>{product[0].productName}</p>
                </div>
                <div className="product-cart-info">
                    <p>{`${e.qnt} X R$${product[0].originalPrice}`}</p>
                </div>
                </div>
            );
          }
          return;
        })}
      </div>
    );
  }

  renderDeliveryAdress(obj) {
    return (
      <div>
        <h4>Endereço:</h4>
        <p>{obj.address} número {obj.number}, {obj.city}</p>
      </div>
    );
  }

  renderIndividualPurchase() {
    const { id } = this.props.match.params;
    const groupshopstore = JSON.parse(localStorage.getItem('storedEvents'));
    const user = JSON.parse(localStorage.getItem('user'));
    const objWanted = groupshopstore.filter((elem) => elem.id === id);
    const somaProdutos = objWanted[0].products.reduce((acc, elem) => {
      if ( elem.user.log === user.log ) {
        return (parseFloat(acc) + parseFloat(productList[(elem.id -1)].originalPrice * elem.qnt)).toFixed(2);
      }
      return parseFloat(acc);
    }, 0);
    const total = somaProdutos;
    return (
      <div>
        <h4>Compra realizada para o evento:</h4> 
        <p>{objWanted[0].name}</p>
        {this.renderListOfProducts(objWanted[0].products, user)}
        <h4>Valor final de:</h4> 
        <p>R${total}</p>
        <h4>Data :</h4>
        <p>{objWanted[0].date}</p>
        {this.renderDeliveryAdress(objWanted[0].address)}
      </div>
    );
  }

  renderPerfilFooter() {
    return (
      <div className="footer">
        <div />
        <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPerfilHeader()}
        <div className="sub-container">
          {this.renderIndividualPurchase()}
        </div>
        {this.renderPerfilFooter()}
      </div>
    );
  }
}

export default GroupDetail;