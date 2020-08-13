import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Confirm from './components/Confirm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products-list" component={ProductsPage} />
        <Route exact path="/productdetails/:id" render={(props) => <ProductDetails props={props} />} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/confirm" component={Confirm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
