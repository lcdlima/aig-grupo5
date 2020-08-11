import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products-list" component={ProductsPage} />
        <Route exact path="/productdetails/:id" render={(props) => <ProductDetails props={props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
