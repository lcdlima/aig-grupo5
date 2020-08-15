import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Collect from './components/Collect';
import Confirm from './components/Confirm';
import FirstPart from './components/Register/FirstPart';
import SecondPart from './components/Register/SecondPart';
import ThirdPart from './components/Register/ThirdPart';
import MainPurchase from './components/MainPurchase';
import Login from './components/Login';
import Perfil from './components/Perfil';
import MainEventRegister from './components/EventRegister/MainEventRegister';
import EventRegisterTerms from './components/EventRegister/EventRegisterTerms';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products-list" component={ProductsPage} />
        <Route exact path="/productdetails/:id" render={(props) => <ProductDetails props={props} />} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/collect" component={Collect} />
        <Route exact path="/confirm" component={Confirm} />
        <Route exact path="/Register" component={FirstPart} />
        <Route exact path="/RegisterAdress" component={SecondPart} />
        <Route exact path="/RegisterCard" component={ThirdPart} />
        <Route exact path="/Perfil" component={Perfil} />
        <Route exact path="/mainPurchase" component={MainPurchase} />
        <Route exact path="/eventRegister" component={MainEventRegister} />
        <Route exact path="/eventTerms" component={EventRegisterTerms} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
