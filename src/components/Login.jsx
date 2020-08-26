import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../CSS/Login.css';
import ambev from '../images/ambev.png';
import logo from '../images/biglogo.png';

const obj1Ambev = {
  email: "ambev@ambev.com",
  password: "senha123",
  name: "Ambev",
  CPF: "32132132132",
  birthDay: "1921-11-01",
  code: "31",
  phone: "321321321",
  CEP: "87654321",
  street: "Ambev",
  adressNumber: "1",
  neighbor: "Ambev",
  complement: "",
  city: "Belo Horizonte",
  stateLetters: "MG",
  cardName: "Ambev",
  cardNumber: "8765432187654321",
  dueDate: "2020-11",
  CVV: "321",
  id: 1,
};
const obj2Ambev = {
  id: 1,
  email: "ambev@ambev.com",
  nome: "Ambev",
  birth: "1921-11-01",
  address: {
    cep: "87654321",
    number: "1",
    complement: "",
    city: "Belo Horizonte",
    street: "Ambev",
  },
  card: {
    number: "Ambev",
    cvv: "8765432187654321",
    cardHolder: "321",
    dueDate: "2020-11"
  },
};

function Login(props) {
  const { data } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  let initialDataAmbev= JSON.parse(localStorage.getItem('usersData') || '[]');
  if (initialDataAmbev.length < 1) {
    localStorage.setItem('usersData', JSON.stringify([obj1Ambev]));
    localStorage.setItem('dataToPurchase', JSON.stringify([obj2Ambev]));
  }

  const clickToEnter = (data, email, password, history) => {
    const allDataOnLS= JSON.parse(localStorage.getItem('usersData') || '[]');
    const existLS = allDataOnLS.some((elem) => elem.email === email);
    const checkLSPassword = allDataOnLS.some((elem) => (elem.email === email && elem.password === password));
    if (checkLSPassword) {
      const InfoUser = allDataOnLS.filter((elem) => elem.email === email);
      localStorage.setItem('user', JSON.stringify({log: InfoUser[0].email, name: InfoUser[0].name, id: InfoUser[0].id}));
      history.push("/aig-grupo5/mainPurchase");
      return;
    }
    if (existLS) {
      alert('Senha invalida');
      return;
    }
    alert('Email não cadastrado!');
  };

  const renderPasswordInput = (password, setPassword) => (
    <div className="conteinerPassword">
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(elem) => setPassword(elem.target.value)}
        min="8"
      />
    </div>
  );

  const renderEmailInput = (email, setEmail) => (
    <div className="conteinerEmail">
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(elem) => setEmail(elem.target.value)}
      />
    </div>
  );

  const renderButtonInput = (data, email, password) => (
    <div className="conteinerButton">
      <button
        style={{ marginBottom: '10px' }}
        className="ButtonInput"
        type="button"
        onClick={() => clickToEnter(data, email, password, history)}
      >
        ENTRAR
      </button>
    </div>
  );

  return (
    <div>
      <div className="conteinerLogin">
        <img src={logo} width="100px" style={{ marginBottom: '10px' }} alt="" />
        {renderEmailInput(email, setEmail)}
        {renderPasswordInput(password, setPassword)}
        {renderButtonInput(data, email, password, history)}
        <Link to="/aig-grupo5/register" className="registeLink"> Ainda não sou cadastrado</Link>
      </div>
      <div className="footerL">
        <img src={ambev} alt="ambevLogo" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userData: state.finishedUserData,
});

export default connect(null, mapStateToProps)(Login);

Login.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
