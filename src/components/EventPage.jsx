import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { chooseEvent } from '../actions';
import '../CSS/EventPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const storedEvents = JSON.parse(localStorage.getItem('storedEvents'));

function copyToClipboard(setHide) {
  navigator.clipboard.writeText(window.location.href);
  setHide(false);
}

function deleteEvent(event, setRedirect) {
  const newEventsList = storedEvents.reduce((acc, e) => {
    if (event.id !== e.id) acc.push(e)
    return acc
  }, []);
  localStorage.setItem('storedEvents', JSON.stringify(newEventsList));
  setRedirect(true);
}

function EventPage(props) {
  const { event, chooseEvent } = props;
  const [isParticipant, setIsParticipant] = useState(false);
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (isParticipant) {
      const newEvent = { ...event, participants: [...event.participants, user.log] };
      localStorage.setItem('storedEvents', JSON.stringify(newEvent));
      chooseEvent(newEvent);
    } else {
      const newParticipants = event.participants.reduce((acc, participant) => {
        if (participant !== user.log) acc.push(participant)
        return acc
      }, []);
      const newEvent = { ...event, participants: newParticipants };
      localStorage.setItem('storedEvents', JSON.stringify(newEvent));
      chooseEvent(newEvent);
    }
  }, [isParticipant]);

  return (
    <div className="event-page-div">
      <h2>{event.name}</h2>

      <div className="info-div">
        <h3>Informações do Evento</h3>
        <p>Data: {event.date}</p>
        <p>Horário: {event.time}</p>
        <p>{`${event.address.address}, ${event.address.number}, ${event.address.complement}`}</p>
        <p>{`${event.address.city}, ${event.address.state}`}</p>
      </div>

      <div className="icon-text-div">
        {open && <FontAwesomeIcon icon={faAngleUp} onClick={() => setOpen(false)} size="1x" />}
        {!open && <FontAwesomeIcon icon={faAngleDown} onClick={() => setOpen(true)} size="1x" />}
        <h3>Participantes</h3>
      </div>

      {open && <div className="participants-div">
        <p>Roi</p>
        {event.participants.map((person) =>
          <p>{person.name}</p>
        )}
      </div>}

      <Link><h3>Carrinho do Evento</h3></Link>

      <div className="buttons-div">
        {!isParticipant && <button onClick={() => setIsParticipant(true)}>Participar do Evento</button>}
        {isParticipant && <button onClick={() => setIsParticipant(false)}>Deixar Evento</button>}
        <Link><button>Adicionar Itens</button></Link>
        <Link><button>Finalizar Compra</button></Link>
        <button onClick={() => deleteEvent(event, setRedirect)}>Excluir Evento</button>
        {redirect && <Redirect to="/mainPurchase" />}
      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({
  event: state.eventReducer.event,
});

const mapDispatchToProps = (dispatch) => ({
  chooseEvent: (e) => dispatch(chooseEvent(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
