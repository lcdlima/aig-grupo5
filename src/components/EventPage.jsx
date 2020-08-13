import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { chooseEvent } from '../actions';

function EventPage(props) {
  const { event } = props;
  const [isParticipant, setIsParticipant] = useState(false);
  const [deleteE, setDeleteE] = useState(false);
  /* useEffect(() => {
    if (isParticipant) {
      const newEvent = {...event, participants: [...event.participants, currentUser]};
      localStorage.setItem('storedEvents', JSON.stringify(newEvent));
    } else {
      const newParticipants = event.participants.reduce((acc, participant) => {
        if (participant !== currentUser) acc.push(participant)
        return acc
      }, []);
      const newEvent = {...event, participants: newParticipants};
      localStorage.setItem('storedEvents', JSON.stringify(newEvent));
    }
  }, [isParticipant]);*/
  /* useEffect(() => {
    const newEventsList = storedEvents.reduce((acc, event) => {
        if (event.id !== id) acc.push(event)
        return acc
      }, []);
    localStorage.setItem('storedEvents', JSON.stringify(newEventsList));
  }, [deleteE]);*/

  return (
    <div>
      <h2>{event.name}</h2>

      <h3>Informações do Evento</h3>
      <div>
        <p>Data: {event.date}</p>
        <p>Horário: {event.time}</p>
        <p>{`${event.address.address}, ${event.address.number}, ${event.address.complement}`}</p>
        <p>{`${event.address.city}, ${event.address.state}`}</p>
      </div>

      <h3>Participantes</h3>
      <div>
        {/*event.participants.map((person) => 
          <p>{person.name}</p>
        )*/}
      </div>

      <Link><h3>Carrinho do Evento</h3></Link>

      {!isParticipant && <button onClick={() => setIsParticipant(true)}>Participar do Evento</button>}
      {isParticipant && <button onClick={() => setIsParticipant(false)}>Deixar Evento</button>}
      <Link><button>Finalizar Compra</button></Link>
      <button onClick={() => setDeleteE(true)}>Excluir Evento</button>
      {deleteE && <Redirect />}
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
