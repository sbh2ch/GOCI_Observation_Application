import {combineReducers} from 'redux';
import {penderReducer} from 'redux-pender';
import ui from './ui';

export default combineReducers({
    ui,
    pender: penderReducer
});