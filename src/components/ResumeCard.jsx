import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import productList from '../services/productList';
import packageList from '../services/packageList';

class ResumeCard extends React.Component {
  render() {
    const { purchaseList } = this.props;
    const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed'));
    const extraInfo = JSON.parse(localStorage.getItem('extraPurchaseData'));
    return (
      <div>
        {
          purchaseList.map((initial) => {
            return shopstore.filter((middle) => middle.id_compra === initial).map((Final, index) => {
              const somaProdutos = Final.cart.reduce((acc, elem) => {
                return (parseInt(acc) + parseFloat(productList[(elem.id - 1)].originalPrice) * elem.total).toFixed(2);
              }, 0);
              const discount = Final.pack.reduce((acc, elem) => {
                const mult = (elem.total === '') ? 0 : elem.total;
                return (parseFloat(acc) + parseFloat(packageList[(elem.id - 1)].price * mult)).toFixed(2);
              }, 0);
              const total = somaProdutos - discount;
              console.log(Final.id_compra);
              return (
                <div className="perfil-elements-info">
                  <p>Compra realizada em {extraInfo[index].day}</p>
                  <p>Valor total de {total}</p>
                  <p>{(Final.collection.isDelivery) ? 'Delivery' : 'Retirada em loja'}</p>
                  <Link to={`/individual-purchase/${Final.id_compra}`}>Detalhes</Link>
                </div>
              );
            })
          })
        }
      </div>
    );
  }
};

ResumeCard.propTypes = {
  purchaseList: PropTypes.array.isRequired,
};

export default ResumeCard;
