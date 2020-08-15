import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { chooseEvent } from '../actions';
import "../CSS/EventChoice.css";

function searchEvent(id, password, setRedirect, chooseEvent) {
  const currentEvents = JSON.parse(localStorage.getItem('storedEvents'));
  let eventExist = [];
  if (currentEvents !== null) {
    eventExist = currentEvents.filter(event => event.id === parseInt(id));
  }
  if (eventExist.length === 0 || parseInt(eventExist[0].password) !== parseInt(password)) {
    alert("Id ou Senha inválida");
  } else {
    chooseEvent(eventExist[0]);
    setRedirect(true);
  }
}

function EventChoice(props) {
  const [searchedID, setSearchedID] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { chooseEvent } = props;
  return (
    <div className="overall-div">
      <div className="choive-div">
        <label htmlFor="id-field">ID do Evento</label>
        <input
          id="id-field"
          type="text"
          onChange={(e) => setSearchedID(e.target.value)}
          value={searchedID}
        />
        <label htmlFor="password-field">Senha</label>
        <input
          id="password-field"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        <button
          onClick={() => searchEvent(searchedID, password, setRedirect, chooseEvent)}
        >Buscar</button>
        <Link className="new-event" to="/create-event">
          <p>Cadastrar Novo Evento</p></Link>
        {redirect && <Redirect to={`/event-page/${searchedID}`} />}
      </div>
    </div>

  );
}

const mapDispatchToProps = (dispatch) => ({
  chooseEvent: (e) => dispatch(chooseEvent(e)),
});

EventChoice.propTypes = {
  chooseEvent: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(EventChoice);