import { combineReducers } from 'redux';
import CartReducer from './CartReducer';
import FinalCartReducer from './FinalCartReducer';
import PackageReducer from './PackageReducer';
import CollectionReducer from './CollectionReducer';

const rootReducer = combineReducers({ CartReducer, FinalCartReducer, PackageReducer, CollectionReducer });

export default rootReducer;
