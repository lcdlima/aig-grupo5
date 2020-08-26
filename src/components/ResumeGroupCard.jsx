import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import productList from '../services/productList';

let today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
today = `${day} / ${month} / ${year}`;

class ResumeGroupCard extends React.Component {
  render() {
    const { purchaseList } = this.props;
    const shopstoreGroup = JSON.parse(localStorage.getItem('storedEvents')) || [];
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        {
          purchaseList.map((initial) => {
            return shopstoreGroup.filter((middle) => middle.id === initial).map((Final, index) => {
              console.log(Final)
              const somaProdutos = Final.products.reduce((acc, elem) => {
                if ( elem.user.log === user.log ) {
                  return (parseFloat(acc) + parseFloat(productList[(elem.id -1)].originalPrice * elem.qnt)).toFixed(2);
                }
                return parseFloat(acc);
              }, 0);
              const total = somaProdutos;
              return (
                <div className="perfil-elements-info">
                  <p>Evento: {Final.name}</p>
                  <p>Compra realizada em {shopstoreGroup[index].date}</p>
                  <p>Valor total de {total}</p>
                  <p>{(shopstoreGroup[index].date === today)
                    ? 'O evento já foi realizado'
                    : 'O evento ainda vai acontecer'}
                  </p>
                  <Link to={`/aig-grupo5/group-purchase/${Final.id}`}>Detalhes</Link>
                </div>
              );
            })
          })
        }
      </div>
    );
  }
};

ResumeGroupCard.propTypes = {
  purchaseList: PropTypes.array.isRequired,
};

export default ResumeGroupCard;
