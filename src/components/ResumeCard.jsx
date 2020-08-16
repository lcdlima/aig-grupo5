import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class ResumeCard extends React.Component {
  render() {
    const { movie } = this.props;
    const {
      imagePath,
      storyline,
      title,
      id,
    } = movie;
    return (
      <div data-testid="movie-card">
        <h2>Compra realizada em {title}</h2>
        <p>Valor total de {storyline}</p>
        <p>{(isDelivery) ? 'Delivery' : 'Retirada em loja'}</p>
        
        <Link to={`/movies/${id}`}>Veja em detalhes</Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string,
    storyline: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default MovieCard;