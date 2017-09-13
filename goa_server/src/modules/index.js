import {combineReducers} from 'redux';
import {penderReducer} from 'redux-pender';
import product from './product';
import ui from './ui';

export default combineReducers({
    product,
    ui,
    pender: penderReducer
});