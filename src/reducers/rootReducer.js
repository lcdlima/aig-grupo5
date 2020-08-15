import { combineReducers } from 'redux';
import CartReducer from './CartReducer';
import FinalCartReducer from './FinalCartReducer';
import PackageReducer from './PackageReducer';
import CollectionReducer from './CollectionReducer';
import finishedUserData from './finishedUserData';
import inProgressRegister from './inProgressRegister';
import inProgressGroupEvent from './inProgressGroupEvent';

const rootReducer = combineReducers({
  CartReducer,
  FinalCartReducer,
  PackageReducer,
  CollectionReducer,
  finishedUserData,
  inProgressRegister,
  inProgressGroupEvent,
});

export default rootReducer;
