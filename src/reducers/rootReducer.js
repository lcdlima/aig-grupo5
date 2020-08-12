import { combineReducers } from 'redux';
import CartReducer from './CartReducer';
import FinalCartReducer from './FinalCartReducer';

const rootReducer = combineReducers({ CartReducer, FinalCartReducer });

export default rootReducer;
