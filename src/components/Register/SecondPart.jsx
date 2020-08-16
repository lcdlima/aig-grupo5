import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { userRegisterAndPassword } from '../../actions/index';
import { getAddressByCep } from '../../services/cep-api';
import '../../CSS/SecondPart.css';
import logo from '../../images/logo.svg';

const arrStates = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA",
  "PB", "PE", "PI", "PR", "RJ", "RN", "RS", "RO", "RR", "SC", "SE", "SP", "TO",
];

function searchCep(cep, setCep, setAdd, setNeig, setCity, setState) {
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
        }
      });
  }
}

const clickToRegister = (
  name, CPF, birthDay, code, phone, CEP, street, adressNumber,
  complement, city, stateLetters, saveUserRegistryAndAdress, history,
) => {
  saveUserRegistryAndAdress(
    name, CPF, birthDay, code, phone, CEP, street,
    adressNumber, complement, city, stateLetters,
  );
  history.push('/RegisterCard');
};

const renderNameInput = (name, setName) => (
  <div className="conteinerNameSP">
    <label htmlFor="name">Nome Completo</label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(elem) => setName(elem.target.value)}
      required
    />
  </div>
);

const renderCPFInput = (CPF, setCPF) => (
  <div className="conteinerCPFSP">
    <label htmlFor="CPF">CPF</label>
    <input
      type="number"
      id="CPF"
      value={CPF}
      onChange={(elem) => setCPF(elem.target.value)}
      required
      max="99999999999"
      minLength="10000000000"
    />
  </div>
);

const renderBirthDayInput = (birthDay, setBirthDay) => (
  <div className="conteinerBirthDaySP">
    <label htmlFor="birthDay">Nascimento</label>
    <input
      type="date"
      id="birthDay"
      value={birthDay}
      onChange={(elem) => setBirthDay(elem.target.value)}
      required
      min="1920-01-01"
      max="2020-01-01"
    />
  </div>
);

const renderPhoneInput = (code, setCode, phone, setPhone) => (
  <div className="conteinerCompletCellphoneSP">
    <div className="conteinerDDDSP">
      <label htmlFor="code">DDD</label>
      <input
        type="number"
        id="code"
        value={code}
        onChange={(elem) => setCode(elem.target.value)}
        required
        max="99"
        min="10"
      />
    </div>
    <div className="conteinerPhoneSP">
      <label htmlFor="phone">Celular</label>
      <input
        type="number"
        id="phone"
        value={phone}
        onChange={(elem) => setPhone(elem.target.value)}
        required
        max="999999999"
        minlength="100000000"
      />
    </div>
  </div>
);

const renderCEPInput = (
  CEP, setCEP, setStreet, setNeighbor, setCity, setStateLetters,
) => (
    <div className="conteinerCEPSP">
      <label htmlFor="CEP">CEP</label>
      <input
        maxlength="8"
        id="CEP"
        value={CEP}
        onChange={(elem) => searchCep(
          elem.target.value, setCEP, setStreet, setNeighbor,
          setCity, setStateLetters,
        )}
      />
    </div>
  );

const renderStreetInput = (street, setStreet) => {
  return (
    <div className="conteinerStreetSP">
      <label htmlFor="street">Rua</label>
      <input
        type="text"
        id="street"
        value={street}
        onChange={(elem) => setStreet(elem.target.value)}
        required
      />
    </div>
  );
}

const renderNeighborInput = (neighbor, setNeighbor) => {
  return (
    <div className="conteinerNeighborSP">
      <label htmlFor="neighbor">Bairro</label>
      <input
        type="text"
        id="neighbor"
        value={neighbor}
        onChange={(elem) => setNeighbor(elem.target.value)}
        required
      />
    </div>
  );
}

const renderNumberInput = (adressNumber, setAdressNumber) => (
  <div className="conteinerAdressNumberSP">
    <label htmlFor="adressNumber">Número</label>
    <input
      type="number"
      id="adressNumber"
      value={adressNumber}
      onChange={(elem) => setAdressNumber(elem.target.value)}
      required
    />
  </div>
);

const renderComplementInput = (complement, setComplement) => (
  <div className="conteinerComplementSP">
    <label htmlFor="complement">Complemento</label>
    <input
      type="text"
      id="complement"
      value={complement}
      onChange={(elem) => setComplement(elem.target.value)}
    />
  </div>
);

const renderCityInput = (city, setCity) => (
  <div className="conteinerCitySP">
    <label htmlFor="city">Cidade</label>
    <input
      type="text"
      id="city"
      value={city}
      onChange={(elem) => setCity(elem.target.value)}
      required
    />
  </div>
);

const renderStateInput = (stateLetters, setStateLetters) => (
  <div className="conteinerStateSP">
    <label htmlFor="stateLetters">Estado</label>
    <select
      id="stateLetters"
      value={stateLetters}
      onChange={(elem) => setStateLetters(elem.target.value)}
      required
    >
      {
        arrStates.map((elem) => (
          <option key={elem} value={elem}>{elem}</option>
        ))
      }
    </select>
  </div>
);

const isDisabled = (
  name, CPF, birthDay, code, phone, CEP, street, adressNumber, city, stateLetters,
) => {
  // if (
  //   CPF.length !== 11 && code.length !== 2 && phone.length !== 9 && CEP.length !== 8
  //   && name && birthDay && street && adressNumber && city && stateLetters
  // ) {
  //   alert('Verifique o CPF, DDD, Telefone e CEP')
  // }
  if (
    CPF.length === 11 && code.length === 2 && phone.length === 9 && CEP.length === 8
    && name && birthDay && street && adressNumber && city && stateLetters
  ) {
    return false;
  }
  return true;
}

const renderNextButtonInput = (
  name, CPF, birthDay, code, phone, CEP, street, adressNumber,
  complement, city, stateLetters, saveUserRegistryAndAdress, history,
) => (
    <div className="conteinerButtonSP">
      <button
        className="buttonSP"
        type="button"
        onClick={() => clickToRegister(
          name, CPF, birthDay, code, phone, CEP, street, adressNumber,
          complement, city, stateLetters, saveUserRegistryAndAdress, history,
        )}
        disabled={isDisabled(CPF, code, phone, CEP)}
      >
        Próximo
    </button>
    </div>
  );

function SecondPart(props) {
  const { saveUserRegistryAndAdress } = props;
  const [name, setName] = useState('');
  const [CPF, setCPF] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [CEP, setCEP] = useState('');
  const [street, setStreet] = useState('');
  const [neighbor, setNeighbor] = useState('');
  const [adressNumber, setAdressNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [stateLetters, setStateLetters] = useState('');
  const history = useHistory();

  return (
    <div>
      <div className="products-page-nav">
        <img src={logo} alt="" width="100px" />
      </div>
      <div className="conteinerCadastro2">
        {renderNameInput(name, setName)}
        <div className="BirthDayAndCPF">
          {renderCPFInput(CPF, setCPF)}
          {renderBirthDayInput(birthDay, setBirthDay)}
        </div>
        {renderPhoneInput(code, setCode, phone, setPhone)}
        <div className="StreetAndCEP">
          {renderCEPInput(
            CEP, setCEP, setStreet, setNeighbor, setCity, setStateLetters,
          )}
          {renderStreetInput(street, setStreet)}
        </div>
        <div className="adressAndComplement">
          {renderNumberInput(adressNumber, setAdressNumber)}
          {renderNeighborInput(neighbor, setNeighbor)}
          {renderComplementInput(complement, setComplement)}
        </div>
        <div className="cityAndState">
          {renderCityInput(city, setCity)}
          {renderStateInput(stateLetters, setStateLetters)}
        </div>
        {renderNextButtonInput(
          name, CPF, birthDay, code, phone, CEP, street, adressNumber,
          complement, city, stateLetters, saveUserRegistryAndAdress, history,
        )}
      </div>
      <div className="footerSP"> </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveUserRegistryAndAdress: (
    name, CPF, birthDay, code, phone, CEP, street,
    adressNumber, complement, city, stateLetters,
  ) => dispatch(
    userRegisterAndPassword(
      name, CPF, birthDay, code, phone, CEP, street,
      adressNumber, complement, city, stateLetters,
    ),
  ),
});

export default connect(null, mapDispatchToProps)(SecondPart);

SecondPart.propTypes = {
  saveUserRegistryAndAdress: PropTypes.func.isRequired,
};
