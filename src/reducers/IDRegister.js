import { ADD_ID } from '../actions/index';

const INITIAL_STATE = {
 id: 1,
};

const inProgressRegister = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ID:
      return {
        id: state +1,
      };
    default:
      return state;
  }
};

export default inProgressRegister;
