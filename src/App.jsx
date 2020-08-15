import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductsPage from './components/ProductsPage';
import EventChoice from './components/EventChoice';
import CreateEvent from './components/CreateEvent';
import EventPage from './components/EventPage';
import EventConfirmation from './components/EventConfirmation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products-list" component={ProductsPage} />
        <Route exact path="/event-choice" component={EventChoice} />
        <Route exact path="/create-event" component={CreateEvent} />
        <Route exact path="/event-page/:id" component={EventPage} />
        <Route exact path="/event-confirmation" component={EventConfirmation} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
