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

class OptionContainer extends Component {
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
        const {handleTimeChange, handleToggle, getMapType} = this;

        const {year, map, month, day, time, type, isDatePickerOpen, UIActions, lon, lat, value} = this.props;
        return (
            <Option>
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
                <ValueView
                    type={type}
                    selected={{lon, lat, value}}/>
                <Footer/>
            </Option>
        )
    }
}

export default connect((state) => ({
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