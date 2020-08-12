const INITIAL_STATE = [];

const FinalCartReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'SEND_TO_CART': if (action.total !== 0) {
      if (state.some(e => e.id === action.id))
        return state.map(e => {
          if (e.id === action.id) return { id: e.id, total: e.total + action.total, pack: e.pack }
          return e
        })
      return [...state, { id: action.id, total: action.total, pack: false }];
    } return state
    case 'MODIFY_PACKAGE': return state.map(e => {
      if (e.id === action.id) {
        return { id: e.id, total: e.total, pack: !e.pack }
      }
      return e
    })
    default: return state;
  }
};

export default FinalCartReducer;
