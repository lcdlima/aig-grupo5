import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import productList from '../services/productList';

const shopstoreGroup = JSON.parse(localStorage.getItem('storedEvents')) || [];
const user = JSON.parse(localStorage.getItem('user'));

let today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
today = `${day} / ${month} / ${year}`;

class ResumeGroupCard extends React.Component {
  render() {
    const { purchaseList } = this.props;
    return (
      <div>
        {
          purchaseList.map((initial) => {
            return shopstoreGroup.filter((middle) => middle.id === initial).map((Final, index) => {
              const somaProdutos = Final.products.reduce((acc, elem) => {
                if ( elem.user.log === user.log ) {
                  console.log(acc);
                  return acc + (productList[(elem.id -1)].originalPrice* elem.qnt);
                }
                return acc;
              }, []);
              const total = somaProdutos;
              return (
                <div>
                  <p>Compra realizada em {shopstoreGroup[index].date}</p>
                  <p>Valor total de {total}</p>
                  <p>{(shopstoreGroup[index].date === today) ? 'O evento já foi realizado' : 'Oevento ainda vai acontecer'}</p>
                  <Link to={`/DetalhesGroup/${Final.id}`}>detalhes</Link>
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
