import React from 'react';
import { Link } from 'react-router-dom';
import productList from '../services/productList';

function ProductDetails(props) {
  const { props: { match: { params: { id } } } } = props;
  const product = productList.filter((e) => e.id === Number(id));
  return (
    <div>
      <div>
        <h1>{product[0].productName}</h1>
        <img src={product[0].thumbnail} width="300px" alt="" />
        <p>{product[0].originalPrice}</p>
        <p>Com a embalagem retornável você paga</p>
        <p>{product[0].discountPrice}</p>
      </div>
      <Link to="/products-list"><button type="button">Voltar</button></Link>
    </div>
  );
}

export default ProductDetails;
