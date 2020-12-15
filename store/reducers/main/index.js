import {combineReducers} from 'redux';
import auth from './auth.reducer';
import data from './data.reducer';
import message from './message.reducer';

const mainReducers = combineReducers({
    auth,
    data,
    message
});

export default mainReducers;
