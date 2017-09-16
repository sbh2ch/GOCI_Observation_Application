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
        const {rectangle} = this.props;
        rectangle.setVisible(!rectangle.getVisible());
        rectangle.setEditable(true);
        //todo step2단계 변경
    };

    handleCreateProduct = () => {

    };

    handleCancelProduct = () => {
        const {rectangle} = this.props;
        rectangle.setVisible(false);
        //todo step1단계 변경
        //todo API서버 로직 변경 필요함. 영역선택 -> 산출물 생성 -> 다운로드
    };

    handleDownload = () => {

    };

    handleTypeSelect = (name) => {
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
        const {handleTypeSelect, handleTimeChange, handleToggle, getMapType, handleCreateCropBox} = this;

        const {cropType, mode, year, map, step, month, day, time, pending, type, isDatePickerOpen, UIActions, lon, lat, value} = this.props;
        return (
            <Option>
                <Dimmed visible={pending['value/GET_VALUE'] || pending['value/GET_LATLON']}/>
                <Spinner visible={pending['value/GET_VALUE'] || pending['value/GET_LATLON']}/>
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
                            type={type}
                            handleTypeSelect={handleTypeSelect}
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