import React, {Component} from 'react';
import Map from '../components/Map/Map';
import {connect} from 'react-redux';
import * as uiActions from '../modules/ui';
import {bindActionCreators} from 'redux';

class MapContainer extends Component {
    state = {
        marker: undefined,
        clickListener: null
    };

    onValueClickListener = (e) => {
        this.state.marker.setPosition(e.point);
        const {UIActions, values, year, month, day, time, type} = this.props;
        const {value, lat} = values;
        const {map} = this.props;

        const getLatLon = async (arrX, arrY, zoom, posX, posY) => {
            try {
                await UIActions.getLatlon({arrX, arrY, zoom, posX, posY});
            } catch (e) {
                console.log(e);
            }
        };

        const getValue = async (year, month, day, time, arrX, arrY, zoom, type, posX, posY) => {
            try {
                await UIActions.getValueArr({year, month, day, time, arrX, arrY, zoom, type, posX, posY});
            } catch (e) {
                console.log(e);
            }
        };

        const setValue = async (zoom, arrX, arrY, posX, posY) => {
            try {
                await UIActions.setValues({zoom, arrX, arrY, posX, posY});
            } catch (e) {
                console.log(e);
            }
        };

        let fName = e.originalEvent.target.src;

        try {
            if (fName.endsWith(".gif")) {
                return;
            }

        } catch (e) {
            console.warn(e);
            return;
        }

        fName = fName.split("/");
        fName = fName[fName.length - 1].split(".")[0].split("-");
        const zoom = map.getZoom();
        const arrX = fName[0];
        const arrY = fName[1];

        let scope;
        switch (zoom) {
            case 3:
                scope = 800;
                if (arrX >= 6 || arrY >= 6)
                    return;
                break;
            case 4:
                scope = 400;
                if (arrX >= 12 || arrY >= 12)
                    return;
                break;
            case 5:
                scope = 200;
                if (arrX >= 25 || arrY >= 25)
                    return;
                break;
            case 6:
                scope = 100;
                if (arrX >= 50 || arrY >= 50)
                    return;
                break;
        }

        const posX = parseInt(((e.coord.x * 32) % scope) / (scope / 100));
        const posY = parseInt(((e.coord.y * 32) % scope) / (scope / 100));

        if (value[zoom - 3][arrX][arrY] === undefined) {
            if (lat[zoom - 3][arrX][arrY] === undefined) {
                getLatLon(arrX, arrY, zoom, posX, posY);
            }
            getValue(year, month, day, time, arrX, arrY, zoom, type, posX, posY);
        } else {
            setValue(zoom, arrX, arrY, posX, posY);
        }
    };

    setUpListenerAndMarker = () => {
        const naver = window.naver;
        const {map} = this.props;
        const {marker} = this.state;

        this.setState({clickListener: naver.maps.Event.addListener(map, 'click', this.onValueClickListener)});
        this.setState({
            marker: new naver.maps.Marker({
                icon: {
                    url: 'assets/img/marker.png',
                    size: new naver.maps.Size(25, 34),
                    scaledSize: new naver.maps.Size(25, 34),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(12, 34)
                },
                position: new naver.maps.Point(62, 66.875),
                map: map
            })
        });
    };

    componentWillReceiveProps(nextProps) {
        const naver = window.naver;
        const {type} = nextProps;
        const {marker, clickListener} = this.state;
        const {map, rectangle} = this.props;


        // todo 이벤트 처리 차후 리펙토링 필요함. (더럽더럽)
        if (nextProps.mode !== this.props.mode) {
            if (nextProps.mode === 'crop') {
                if (this.props.type === 'RGB')
                    return;

                if (marker !== undefined)
                    marker.onRemove();

                this.setState({marker: undefined});
                naver.maps.Event.removeListener(clickListener);
            } else {
                rectangle.setVisible(false);
                //todo 1step으로 변경

                if (nextProps.type !== 'RGB') {
                    this.setUpListenerAndMarker();
                }
            }
        }

        if (this.props.type !== nextProps.type) {
            naver.maps.Event.removeListener(clickListener);
            if (type === 'RGB') {
                map.setCursor('auto');

                if (marker !== undefined)
                    marker.onRemove();

                this.setState({marker: undefined});
            } else {
                if (nextProps.mode !== 'crop') {
                    map.setCursor('pointer');
                    this.setUpListenerAndMarker();
                }
            }
        }
    }


    componentDidMount() {
        console.log('componentDidMount');
        const naver = window.naver;
        const mapDiv = document.getElementById('map');
        const {year, map, month, day, time, type, UIActions} = this.props;

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
        const getMapType = function (type, year, month, day, time) {
            const $ = window.jQuery;
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
                },
                mapTypeOption = $.extend({}, commonOptions, {
                    name: type,
                    tileSet: `http://222.236.46.44/img/${year}/${month}/${day}/${time}/{z}/${type}/{x}-{y}.JPG`,
                    uid: ''
                });

            return new naver.maps.ImageMapType(mapTypeOption);
        };

        UIActions.setMap(new naver.maps.Map(mapDiv, {
            center: new naver.maps.Point(75, 75),
            zoom: 3,
            minZoom: 3,
            background: '#000000',
            logoControl: false,
            mapTypes: new naver.maps.MapTypeRegistry({
                'RGB': getMapType(type, year, month, day, time),
            }),
            mapTypeId: 'RGB',
            disableDoubleClickZoom: true,
            disableDoubleTapZoom: true
        }));
    }

    render() {
        return (
            <Map/>
        );
    };
}

export default connect((state) => ({
        rectangle: state.ui.getIn(['crop', 'rectangle']),
        isCropBoxMade: state.ui.get('isCropBoxMade'),
        mode: state.ui.get('mode'),
        map: state.ui.get('map'),
        year: state.ui.getIn(['info', 'year']),
        month: state.ui.getIn(['info', 'month']),
        day: state.ui.getIn(['info', 'day']),
        time: state.ui.getIn(['info', 'time']),
        type: state.ui.getIn(['info', 'type']),
        values: state.ui.get('values').toJS(),
        zoom: state.ui.getIn(['info', 'zoom']),
        cropMode: state.ui.get('cropMode')
    }), (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(MapContainer);