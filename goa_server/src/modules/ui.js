import {handleActions, createAction} from 'redux-actions';
import {Map, List, fromJS} from 'immutable';
import {pender} from 'redux-pender';
import * as WebAPI from '../lib/web-api';

const SET_OPTION = 'ui/SET_OPTION';
const CHANGE_INFO = 'ui/CHANGE_INFO';
const TOGGLE_DATE = 'ui/TOGGLE_DATE';
const GET_LATLON = 'value/GET_LATLON';
const GET_VALUE = 'value/GET_VALUE';
const SET_VALUES = 'value/SET_VALUES';


export const setOption = createAction(SET_OPTION); // { type }
export const changeInfo = createAction(CHANGE_INFO); // { name, value }
export const toggleDate = createAction(TOGGLE_DATE);
export const getLatlon = createAction(GET_LATLON, WebAPI.getLatLon, payload => payload); // { data, status, meta: {arrX, arrY, zoom} }
export const getValueArr = createAction(GET_VALUE, WebAPI.getValue, payload => payload);
export const setValues = createAction(SET_VALUES); // {zoom, arrX, arrY, posX, posY}

const generate = () => {
    const value = [new Array(6), new Array(12), new Array(25), new Array(50)];
    const lat = [new Array(6), new Array(12), new Array(25), new Array(50)];
    const lon = [new Array(6), new Array(12), new Array(25), new Array(50)];
    const zooms = [6, 12, 25, 50];
    for (let i = 0; i < zooms.length; i++) {
        for (let j = 0; j < zooms[i]; j++) {
            value[i][j] = new Array(zooms[i]);
            lat[i][j] = new Array(zooms[i]);
            lon[i][j] = new Array(zooms[i]);
        }
    }
    return {value, lat, lon};
};

const valueReset = () => {
    const value = [new Array(6), new Array(12), new Array(25), new Array(50)];
    const zooms = [6, 12, 25, 50];
    for (let i = 0; i < zooms.length; i++) {
        for (let j = 0; j < zooms[i]; j++) {
            value[i][j] = new Array(zooms[i]);
        }
    }

    return value;
};

const initialState = Map({
    info: Map({
        year: '2017',
        month: '09',
        day: '07',
        time: '00',
        type: 'RGB',
        zoom: 3,
        selected: Map({
            lat: '',
            lon: '',
            value: ''
        })
    }),
    isCrop: false,
    isDatePickerOpen: false,
    values: fromJS(generate())
});

export default handleActions({
    [SET_OPTION]: (state, action) => state.set('option', action.payload),
    [CHANGE_INFO]: (state, action) => state.setIn(['info', action.payload.name], action.payload.value).setIn(['values', 'value'], fromJS(valueReset())),
    [TOGGLE_DATE]: (state) => state.set('isDatePickerOpen', !state.get('isDatePickerOpen')),
    [SET_VALUES]: (state, action) => {
        const {zoom, arrX, arrY, posX, posY} = action.payload;

        return state.setIn(['info', 'selected', 'lon'], state.getIn(['values', 'lon', zoom - 3, arrX, arrY, posX, posY]))
            .setIn(['info', 'selected', 'lat'], state.getIn(['values', 'lat', zoom - 3, arrX, arrY, posX, posY]))
            .setIn(['info', 'selected', 'value'], state.getIn(['values', 'value', zoom - 3, arrX, arrY, posX, posY]))
    },
    ...pender({
        type: GET_LATLON,
        onSuccess: (state, action) => {
            const {payload, meta} = action;
            const {arrX, arrY, zoom, posX, posY} = meta;

            return state.setIn(['values', 'lat', zoom - 3, arrX, arrY], fromJS(payload.data[0]))
                .setIn(['values', 'lon', zoom - 3, arrX, arrY], fromJS(payload.data[1]))
                .setIn(['info', 'selected', 'lat'], payload.data[0][posX][posY])
                .setIn(['info', 'selected', 'lon'], payload.data[1][posX][posY]);
        }
    }),
    ...pender({
        type: GET_VALUE,
        onSuccess: (state, action) => {
            const {payload, meta} = action;
            const {arrX, arrY, zoom, posX, posY} = meta;

            return state.setIn(['values', 'value', zoom - 3, arrX, arrY], fromJS(payload.data))
                .setIn(['info', 'selected', 'value'], payload.data[posX][posY]);
        }
    })
}, initialState);