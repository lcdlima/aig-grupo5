import { combineReducers } from 'redux';
import Reducer1 from './reducer1';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({ Reducer1, eventReducer });

export default rootReducer;
