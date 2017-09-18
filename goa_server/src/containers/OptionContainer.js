import React, {Component} from 'react';
import * as uiActions from '../modules/ui';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Option from '../components/Option/Option';
import Layout from '../components/Layout';
import Date from '../components/Option/Date';
import TypeSelector from "../components/Option/TypeSelector";
import ValueView from '../components/Option/ValueView';
import Footer from '../components/Footer';
import Dimmed from '../components/Dimmed';
import Spinner from '../components/Spinner';
import CropView from '../components/Option/CropView';

class OptionContainer extends Component {
    handleCreateCropBox = () => {
        const {rectangle, UIActions, step, type} = this.props;
        if (step !== 1 || type === 'RGB') return;

        rectangle.setVisible(!rectangle.getVisible());
        rectangle.setEditable(true);

        UIActions.changeStep(2);
        //todo step2단계 변경
    };

    handleCreateProduct = () => {
        const {rectangle, UIActions, year, month, day, time, type, cropType, step} = this.props; // {date, startX, startY, endX, endY, type, outputType}
        const {_max, _min} = rectangle.bounds;

        if (step !== 2) return;
        UIActions.createProduct(
            {
                date: year + '-' + month + '-' + day + '-' + time,
                startX: Math.round(_min.x * 32),
                startY: Math.round(_min.y * 32),
                endX: Math.round(_max.x * 32),
                endY: Math.round(_max.y * 32),
                type: type,
                outputType: cropType
            });
        //todo Spinner 추가

        UIActions.changeStep(3);
    };

    handleCancelProduct = () => {
        const {rectangle, UIActions, step} = this.props;

        if (step !== 2) return;
        rectangle.setVisible(false);
        UIActions.changeStep(1);
    };

    handleDownload = () => {
        if (this.props.step !== 3) return;

        window.location.assign(this.props.link);
    };

    handleTypeSelect = (name) => {
        if (this.props.step !== 2) return;
        const {setCropType} = this.props.UIActions;

        setCropType(name);
    };

    handleTimeChange = (val) => {
        const {changeInfo} = this.props.UIActions;

        changeInfo(val);
    };

    handleToggle = () => {
        const {toggleDate} = this.props.UIActions;
        toggleDate();
    };

    getMapType = (type, year, month, day, time) => {
        const $ = window.jQuery;
        const naver = window.naver;

        const tileSize = new naver.maps.Size(200, 200);
        const proj = {
            fromCoordToPoint: function (coord) {
                let pcoord = coord.clone();
                if (coord instanceof naver.maps.LatLng) {
                    pcoord = new naver.maps.Point(coord.lng(), coord.lat());
                }
                return pcoord.div(tileSize.width, tileSize.height);
            },
            fromPointToCoord: function (point) {
                return point.clone().mul(tileSize.width, tileSize.height);
            }
        };

        const commonOptions = {
            name: '',
            minZoom: 0,
            maxZoom: 6,
            tileSize: tileSize,
            projection: proj,
            repeatX: false,
            tileSet: '',
            vendor: 'KOSC',
            uid: ''
        };

        const mapTypeOption = $.extend({}, commonOptions, {
            name: type,
            tileSet: `http://222.236.46.44/img/${year}/${month}/${day}/${time}/{z}/${type}/{x}-{y}.JPG`,
            uid: ''
        });

        return new naver.maps.ImageMapType(mapTypeOption);
    };


    render() {
        const {handleTypeSelect, handleDownload, handleCreateProduct, handleTimeChange, handleToggle, handleCancelProduct, getMapType, handleCreateCropBox} = this;

        const {cropType, mode, year, map, step, month, day, time, pending, type, isDatePickerOpen, lon, lat, value} = this.props;
        return (
            <Option>
                <Dimmed
                    visible={pending['value/GET_VALUE'] || pending['value/GET_LATLON'] || pending['crop/CREATE_PRODUCT']}/>
                <Spinner
                    visible={pending['value/GET_VALUE'] || pending['value/GET_LATLON'] || pending['crop/CREATE_PRODUCT']}/>
                <Layout.Title style={{borderBottom: `1px solid #bcbcbc`}}>
                    Real Time Satellite Image
                </Layout.Title>
                <Date
                    type={type}
                    map={map}
                    year={year}
                    month={month}
                    day={day}
                    time={time}
                    isOpen={isDatePickerOpen}
                    getMapType={getMapType}
                    onTimeChange={handleTimeChange}
                    onToggle={handleToggle}/>
                <TypeSelector
                    map={map}
                    year={year}
                    month={month}
                    day={day}
                    time={time}
                    type={type}
                    getMapType={getMapType}
                    onChange={handleTimeChange}/>

                {
                    mode === 'value' ?
                        <ValueView
                            type={type}
                            selected={{lon, lat, value}}/> :
                        <CropView
                            handleCreateCropBox={handleCreateCropBox}
                            handleCreateProduct={handleCreateProduct}
                            type={type}
                            handleDownload={handleDownload}
                            handleTypeSelect={handleTypeSelect}
                            handleCancelProduct={handleCancelProduct}
                            cropType={cropType}
                            step={step}/>
                }

                <Footer/>
            </Option>
        )
    }
}

export default connect((state) => ({
        cropType: state.ui.getIn(['crop', 'cropType']),
        drawingManager: state.ui.get('drawingManager'),
        rectangle: state.ui.getIn(['crop', 'rectangle']),
        pending: state.pender.pending,
        step: state.ui.getIn(['crop', 'step']),
        mode: state.ui.get('mode'),
        map: state.ui.get('map'),
        year: state.ui.getIn(['info', 'year']),
        month: state.ui.getIn(['info', 'month']),
        day: state.ui.getIn(['info', 'day']),
        time: state.ui.getIn(['info', 'time']),
        type: state.ui.getIn(['info', 'type']),
        lat: state.ui.getIn(['info', 'selected', 'lat']),
        lon: state.ui.getIn(['info', 'selected', 'lon']),
        value: state.ui.getIn(['info', 'selected', 'value']),
        option: state.ui.get('option'),
        isDatePickerOpen: state.ui.get('isDatePickerOpen')
    }), (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(OptionContainer);