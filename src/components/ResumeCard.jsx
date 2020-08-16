import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const shopstore = JSON.parse(localStorage.getItem('purchaseFineshed'));

class ResumeCard extends React.Component {
  render() {
  const { purchaseList } = this.props;
  return (
    <div data-testid="movie-card">
        <h2>Compra realizada em {title}</h2>
        <p>Valor total de {storyline}</p>
        <p>{(isDelivery) ? 'Delivery' : 'Retirada em loja'}</p>
    </div>
  );
    return (
      {
        purchaseList.map((initial) => (
          shopstore.filter((middle) => middle.id_compra === initial)[0].map((Final) => {
            return (
              <div>
                <p>Compra realizada em {title}</p>
                <p>Valor total de {storyline}</p>
                <p>{(Final.collection.isDelivery) ? 'Delivery' : 'Retirada em loja'}</p>
                <p>{`${products.productName} ${products.package_volume}L`}</p>
                <p>{`x ${ell.total}`}</p>
                <Link to={`/movies/${id}`}>Veja em detalhes</Link>
              </div>
            );
            const products = (productList.filter((elll) => elll.id === ell.id)[0]);
          })
        ))
      }
    )
  }
}

MovieCard.propTypes = {
    purchaseList: PropTypes.array.isRequired,
};

export default MovieCard;