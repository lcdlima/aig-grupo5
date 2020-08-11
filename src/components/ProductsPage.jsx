import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import productList from '../services/productList';
import '../CSS/ProductsPage.css';

function renderFilter(selectedFilter, setSelectedFilter) {
  let filters = productList.reduce((arr, e) => {
    if (arr.includes(e.category)) return arr;
    return [...arr, e.category];
  }, []);
  filters = ['Todos', ...filters];
  return (
    <div>
      <p>Filtrar por Tipo de Bebida</p>
      <select onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter}>
        {filters.map((e) => <option>{e}</option>)}
      </select>
    </div>
  );
}

function renderAddButtons(productAmount, setProductAmount, id) {
  const total = productAmount.filter((e) => e.id === id)[0].amount;
  return (
    <div className="increment-buttons">
      <button
        onClick={() => setProductAmount((amount) => {
          if (amount > 0) {
            return amount - 1;
          }
          return 0;
        })}
        type="button"
      >
        -

      </button>
      <p>{total}</p>
      <button
        onClick={() => {
          setProductAmount((state) => state.map((e) => {
            if (e.id === id) {
              return { id, amount: e.amount + 1 };
            }
            return e;
          }));
        }}
        type="button"
      >
        +

      </button>
    </div>
  );
}

function filterProducts(selectedFilter, productAmount, setProductAmount) {
  return (
    <div className="products-container">
      {(selectedFilter === 'Todos') && productList.map((e) => (
        <div>
          <Link to={`/productdetails/${e.id}`}>
            <div className="products-list">
              <img src={e.thumbnail} width="100px" alt="" />
              <p>{e.productName}</p>
              <p>{e.discountPrice}</p>
            </div>
          </Link>
          {renderAddButtons(productAmount, setProductAmount, e.id)}
        </div>
      ))}
      {(selectedFilter !== 'Todos') && productList.filter((e) => e.category === selectedFilter)
        .map((e) => (
          <div>
            <Link to={`/productdetails/${e.id}`}>
              <div className="products-list">
                <img src={e.thumbnail} width="100px" alt="" />
                <p>{e.productName}</p>
                <p>{e.discountPrice}</p>
              </div>
            </Link>
            {renderAddButtons(productAmount, setProductAmount, e.id)}
          </div>
        ))}
    </div>
  );
}

function ProductsPage() {
  const initialState = productList.map((e) => ({ id: e.id, amount: 0 }));
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [productAmount, setProductAmount] = useState(initialState);
  console.log(productAmount);
  return (
    <div>
      <h1>Lista de Produtos</h1>
      {renderFilter(selectedFilter, setSelectedFilter)}
      {filterProducts(selectedFilter, productAmount, setProductAmount)}
    </div>
  );
}

export default ProductsPage;
