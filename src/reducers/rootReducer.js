import { combineReducers } from 'redux';
import CartReducer from './CartReducer';
import FinalCartReducer from './FinalCartReducer';
import PackageReducer from './PackageReducer';

const rootReducer = combineReducers({ CartReducer, FinalCartReducer, PackageReducer });

export default rootReducer;
