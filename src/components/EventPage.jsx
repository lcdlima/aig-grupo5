import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../CSS/EventPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { chooseEvent } from '../actions';
import logo from '../images/logo.svg';
import userchar from '../images/user.svg';

function copyToClipboard(setHide, props) {
  const { event } = props;
  navigator.clipboard.writeText(`Participe de ${event.nome}. Entre em Jao, selecione Grupo e digite as seguintes informações: ID: ${event.ID} e Senha: ${event.password}`);
  setHide(false);
}

function deleteEvent(event, setRedirect) {
  const storedEvents = JSON.parse(localStorage.getItem('storedEvents'));
  const newEventsList = storedEvents.reduce((acc, e) => {
    if (event.id !== e.id) acc.push(e);
    return acc;
  }, []);
  localStorage.setItem('storedEvents', JSON.stringify(newEventsList));
  setRedirect(true);
}

function EventParticipation(isParticipant, setIsParticipant, props) {
  const { event, chooseEvent } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  let newParticipants = [];

  if (isParticipant) {
    newParticipants = [...event.participants, user];
    setIsParticipant(false);
  } else {
    newParticipants = event.participants.reduce((acc, p) => {
      if (p.log !== user.log) {
        acc.push(p);
      }
      return acc;
    }, []);
    setIsParticipant(true);
  }
  chooseEvent({ ...event, participants: newParticipants });
}

function EventPage(props) {
  const { event } = props;
  const [isParticipant, setIsParticipant] = useState(false);
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    event.participants.forEach((p) => {
      if (p.log === user.log) {
        setIsParticipant(true);
      }
    })
  }, []);

  useEffect(() => {
    return () => {
      const currentEvents = JSON.parse(localStorage.getItem('storedEvents'));
      const newEvents = currentEvents.reduce((acc, e) => {
        if (e.id !== event.id) {
          acc.push(e)
        } else {
          acc.push(event)
        }
        return acc
      }, [])
      localStorage.setItem('storedEvents', JSON.stringify(newEvents));
    }
  });

  return (
    <div>
      <div className="products-page-nav">
        <img src={logo} alt="" width="100px" />
      </div>
      <div className="container">
        <div className="event-page-div">
          <div className="info-div">
            <h3>Informações do Evento</h3>
            <h2>{event.name}</h2>
            <p>{`Data: ${event.date}`}</p>
            <p>{`Horário: ${event.time}`}</p>
            <p>{`${event.address.address}, ${event.address.number}, ${event.address.complement}`}</p>
            <p>{`${event.address.city}, ${event.address.state}`}</p>
          </div>

          <div className="icon-text-div">
            {open && <FontAwesomeIcon icon={faAngleUp} onClick={() => setOpen(false)} size="1x" />}
            {!open && <FontAwesomeIcon icon={faAngleDown} onClick={() => setOpen(true)} size="1x" />}
            <h3>Participantes</h3>
          </div>

          {open && (
            <div className="participants-div">
              <p>Roi</p>
              {event.participants.map((person) => <p>{person.name}</p>)}
            </div>
          )}

          <div className="buttons-div">
            {!isParticipant && <button onClick={() => EventParticipation(isParticipant, setIsParticipant, props)}>Participar do Evento</button>}
            {isParticipant && <button onClick={() => EventParticipation(isParticipant, setIsParticipant, props)}>Deixar Evento</button>}
            {isParticipant && <Link to="/group-products-list"><button>Adicionar Itens</button></Link>}
            <button>Compartilhar Evento</button>
            {user.log === event.owner.log && <Link to="/group-cart"><button>Finalizar Compra</button></Link>}
            <button onClick={() => deleteEvent(event, setRedirect)}>Excluir Evento</button>
            {redirect && <Redirect to="/mainPurchase" />}
          </div>
        </div>
      </div>
      <div className="footer">
        <div />
        <Link to="/Perfil"><img src={userchar} alt="" width="30px" /></Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  event: state.eventReducer.event,
});

const mapDispatchToProps = (dispatch) => ({
  chooseEvent: (e) => dispatch(chooseEvent(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
