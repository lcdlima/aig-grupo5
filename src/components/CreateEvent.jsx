import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAddressByCep } from '../services/cep-api';
import { chooseEvent } from '../actions';
import '../CSS/CreateEvent.css';

function addEvent(name, date, time, cep, add, numb, comp, city, state, password, chooseEvent, setRedirect) {
  const id = Math.floor((Math.random() * 1000) + 1);
  const newEvent = {
    id,
    password,
    name,
    date,
    time,
    cep,
    address: {
      address: add,
      number: numb,
      complement: comp,
      city,
      state
    },
    participants: [],
    products: []
  }
  const currentEvents = JSON.parse(localStorage.getItem('storedEvents'));
  if (currentEvents !== null) {
    localStorage.setItem('storedEvents', JSON.stringify([...currentEvents, newEvent]));
  } else {
    localStorage.setItem('storedEvents', JSON.stringify([newEvent]));
  }
  chooseEvent(newEvent);
  setRedirect(true);
}

function searchCep(cep, setCep, setAdd, setNeig, setCity, setState, setDisabledInput) {
  setCep(cep);
  if (cep.toString().length === 8) {
    getAddressByCep(cep)
      .then((answer) => {
        if (answer.error) {
          alert("Cep Inválido");
        } else {
          setAdd(answer.logradouro);
          setNeig(answer.bairro);
          setCity(answer.localidade);
          setState(answer.uf);
          setDisabledInput(true);
        }
      });
  }
}

function CreateEvent(props) {
  const { chooseEvent } = props;
  const [name, setname] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [cep, setcep] = useState('');
  const [address, setaddress] = useState('');
  const [number, setnumber] = useState('');
  const [complement, setcomplement] = useState('');
  const [neighbor, setneighbor] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [password, setpassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  return (
    <form class="form-div">
      <label htmlFor="name-field">Nome do Evento</label>
      <input
        id="name-field"
        value={name}
        onChange={(e) => setname(e.target.value)}
        size="300"
      />
      <div className="time-div">
        <label htmlFor="date-field">Data do Evento</label>
        <input
          type="date"
          id="date-field"
          value={date}
          onChange={(e) => setdate(e.target.value)}
        />
        <label htmlFor="time-field">Horário</label>
        <input
          type="time"
          id="time-field"
          value={time}
          onChange={(e) => settime(e.target.value)}
        />
      </div>

      <label htmlFor="password-field">Senha de Acesso</label>
      <input id="password-field" value={password} onChange={(e) => setpassword(e.target.value)} />

      <h3>Local do Evento</h3>
      <label htmlFor="cep-field">CEP</label>
      <input
        maxlength="8"
        id="cep-field"
        value={cep}
        onChange={(e) => searchCep(e.target.value, setcep, setaddress, setneighbor, setcity, setstate, setDisabledInput)}
      />
      <label htmlFor="address-field">Endereço</label>
      <input id="address-field" value={address} onChange={(e) => setaddress(e.target.value)} disabled={disabledInput} />
      <label htmlFor="number-field">Número</label>
      <input id="number-field" value={number} onChange={(e) => setnumber(e.target.value)} />
      <label htmlFor="complement-field">Complemento</label>
      <input id="complement-field" value={complement} onChange={(e) => setcomplement(e.target.value)} />
      <label htmlFor="neighbor-field">Bairro</label>
      <input id="neighbor-field" value={neighbor} onChange={(e) => setneighbor(e.target.value)} disabled={disabledInput} />
      <label htmlFor="city-field">Cidade</label>
      <input id="city-field" value={city} onChange={(e) => setcity(e.target.value)} disabled={disabledInput} />
      <label htmlFor="state-field">Estado</label>
      <input id="state-field" value={state} onChange={(e) => setstate(e.target.value)} disabled={disabledInput} />

      <button
        onClick={() => addEvent(name, date, time, cep, address, number, complement, city, state, password, chooseEvent, setRedirect)}
      >Próximo</button>

      {redirect && <Redirect to={`/event-confirmation`} />}
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  chooseEvent: (e) => dispatch(chooseEvent(e)),
});

export default connect(null, mapDispatchToProps)(CreateEvent);