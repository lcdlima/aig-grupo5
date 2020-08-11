import React, { useState } from 'react';
import productList from '../services/productList';
import '../CSS/ProductsPage.css';

function renderFilter() {
  let filters = productList.reduce((arr, e) => {
    if (arr.includes(e.category)) return arr;
    return [...arr, e.category];
  }, []);
  filters = ['Todos', ...filters];
  return (
    <div>
      <p>Filtrar por Tipo de Bebida</p>
      <select>
        {filters.map((e) => <option>{e}</option>)}
      </select>
    </div>
  );
}

function ProductsPage() {
  return (
    <div>
      <h1>Lista de Produtos</h1>
      {renderFilter()}
      <div className="products-container">
        {productList.map((e) => (
          <div className="products-list">
            <img src={e.thumbnail} width="100px" alt="" />
            <p>{e.productName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
