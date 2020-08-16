const INITIAL_STATE = [{ id: 1, total: 0 }, { id: 2, total: 0 }, { id: 3, total: 0 }];
const PackageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT': return state.map((e) => {
      if (e.id === action.id) return { id: e.id, total: Number(action.total) };
      return e;
    });
    default: return state;
  }
};

export default PackageReducer;
