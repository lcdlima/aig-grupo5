import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import productList from '../services/productList';
import packageList from '../services/packageList';

const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed'));
const extraInfo = JSON.parse(localStorage.getItem('extraPurchaseData'));

class ResumeCard extends React.Component {
  render() {
    const { purchaseList } = this.props;
    console.log(purchaseList);
    return (
      <div>
        {
          purchaseList.map((initial) => {
            return shopstore.filter((middle) => middle.id_compra === initial).map((Final, index) => {
              const somaProdutos = Final.cart.reduce((acc, elem) => {
                acc = parseInt(acc + parseInt(parseInt(productList[elem.id].originalPrice) * elem.total)).toFixed(2);
                return acc;
              }, []);
              console.log(Final.pack);
              const discount = Final.pack.reduce((acc, elem) => {
                const mult = (elem.total === '') ? 0 : elem.total;
                const acount = (acc === Number) ? acc : 0;
                acc = acount + parseInt(packageList[(elem.id - 1)].price * mult);
                return acc;
              }, []);
              const total = somaProdutos - discount;
              return (
                <div className="perfil-elements-info">
                  <p>Compra realizada em {extraInfo[index].day}</p>
                  <p>Valor total de {total}</p>
                  <p>{(Final.collection.isDelivery) ? 'Delivery' : 'Retirada em loja'}</p>
                  {/* <Link to={`/Detalhes/${Final.id}`}>detalhes</Link> */}
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
