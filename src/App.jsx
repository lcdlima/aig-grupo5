import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsPage from './components/ProductsPage';
import EventChoice from './components/EventChoice';
import CreateEvent from './components/CreateEvent';
import EventPage from './components/EventPage';
import EventConfirmation from './components/EventConfirmation';
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
import GroupProductsPage from './components/GroupProductsPage';
import GroupProductsDetails from './components/GroupProductDetails';
import GroupCart from './components/GroupCart';
import GroupFinishOrder from './components/GroupFinishOrder';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route exact path="/aig-grupo5/products-list" component={ProductsPage} />
        <Route exact path="/aig-grupo5/event-choice" component={EventChoice} />
        <Route exact path="/aig-grupo5/create-event" component={CreateEvent} />
        <Route exact path="/aig-grupo5/event-page/:id" component={EventPage} />
        <Route exact path="/aig-grupo5/event-confirmation" component={EventConfirmation} />
        <Route exact path="/aig-grupo5/productdetails/:id" render={(props) => <ProductDetails props={props} />} />
        <Route exact path="/aig-grupo5/cart" component={Cart} />
        <Route exact path="/aig-grupo5/payment" component={Payment} />
        <Route exact path="/aig-grupo5/collect" component={Collect} />
        <Route exact path="/aig-grupo5/confirm" component={Confirm} />
        <Route exact path="/aig-grupo5/Register" component={FirstPart} />
        <Route exact path="/aig-grupo5/RegisterAdress" component={SecondPart} />
        <Route exact path="/aig-grupo5/RegisterCard" component={ThirdPart} />
        <Route exact path="/aig-grupo5/Perfil" component={Perfil} />
        <Route exact path="/aig-grupo5/mainPurchase" component={MainPurchase} />
        <Route exact path="/aig-grupo5/" component={Login} />
        <Route exact path="/aig-grupo5/group-products-list" component={GroupProductsPage} />
        <Route exact path="/aig-grupo5/group-products-details/:id" render={(props) => <GroupProductsDetails props={props} />} />
        <Route exact path="/aig-grupo5/group-cart" component={GroupCart} />
        <Route exact path="/aig-grupo5/group-finish-order" component={GroupFinishOrder} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
