import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import productList from '../services/productList';
import packageList from '../services/packageList';
import userchar from '../images/user.svg';
import logo from '../images/logo.svg';

class IndividualDetail extends Component {
  renderPerfilHeader() {
    return (
      <div className="products-page-nav">
        <Link to="/mainPurchase"><img src={logo} alt="" width="100px" /></Link>
      </div>
    );
  }

  renderListOfProducts(arr) {
    return (
      <div className="products">
        <h4>Produtos comprados:</h4>
        {arr.map((e) => {
          const product = productList.filter((el) => el.id === Number(e.id));
          return (
            <div className="products-cart-list">
              <div>
                <img src={product[0].thumbnail} width="50px" alt="" />
                <p>{product[0].productName}</p>
              </div>
              <div className="product-cart-info">
                <p>{`${e.total} X R$${product[0].originalPrice}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderReturnedRecipient(arr) {
    const packedNumbers = arr.reduce((acc, elem) => {
      const mult = (elem.total === '') ? 0 : elem.total;
      return (parseInt(acc) + parseInt(mult));
    }, 0);
    if (packedNumbers === 0) return <h4>Nenhuma embalagem foi devolvida</h4>;
    return (
      <div className="products">
        <h4>Devolvidos:</h4>
        {arr.map((e) => {
          const product = packageList.filter((el) => el.id === Number(e.id));
          const eco = (e.total * e.price)
          if(e.total > 0) {
            return (
              <div>
                <p>
                  {e.total} recipientes de {e.type}
                </p>
                <p>
                  gerando uma economia de R${eco}
                </p>
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
        <h4>Entregue em:</h4>
        <p>{obj.adress} número {obj.number}, {obj.city}</p>
      </div>
    );
  }

  renderIndividualPurchase() {
    const { id } = this.props.match.params;
    const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed'));
    const extraInfo = JSON.parse(localStorage.getItem('extraPurchaseData'));
    const user = JSON.parse(localStorage.getItem('user'));
    const objWanted = shopstore.filter((elem) => elem.id_compra === parseInt(id));
    const somaProdutos = objWanted[0].cart.reduce((acc, elem) => {
      return (parseInt(acc) + parseFloat(productList[(elem.id - 1)].originalPrice) * elem.total).toFixed(2);
    }, 0);
    const discount = objWanted[0].pack.reduce((acc, elem) => {
      const mult = (elem.total === '') ? 0 : elem.total;
      return (parseFloat(acc) + parseFloat(packageList[(elem.id - 1)].price * mult)).toFixed(2);
    }, 0);
    const total = (somaProdutos - discount).toFixed(2);
    console.log(extraInfo);
    const ObjExtra = extraInfo.filter((elem) => elem.id === parseInt(id));
    console.log(ObjExtra);
    const DeliveryOrNot = objWanted[0].collection.isDelivery;
    return (
      <div>
        <h4>Compra foi realizada em</h4><p>{ObjExtra[0].day}</p>
        {this.renderListOfProducts(objWanted[0].cart)}
        {this.renderReturnedRecipient(objWanted[0].pack)}
        <h4>Valor final de:</h4> 
        <p>R${total}</p>
        {(DeliveryOrNot)
          ? <h4>A compra foi entregue via delivery</h4>
          : <h4>A compra foi retirada em loja</h4>
        }
        {DeliveryOrNot && this.renderDeliveryAdress(ObjExtra[0])}
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

export default IndividualDetail;
