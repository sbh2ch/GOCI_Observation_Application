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
        if (fName.endsWith(".gif")) {
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

    componentWillReceiveProps(nextProps) {
        const naver = window.naver;
        const {isCrop, type} = nextProps;
        const {marker, clickListener} = this.state;
        const {map} = this.props;
        if (this.props.type !== nextProps.type) {
            naver.maps.Event.removeListener(clickListener);
            if (type === 'RGB') {
                map.setCursor('auto');
                marker.onRemove();
                this.setState({marker: undefined});
            } else {
                map.setCursor('pointer');
                this.setState({clickListener: naver.maps.Event.addListener(map, 'click', this.onValueClickListener)});

                if (marker === undefined) {
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
                }
            }
        }
    }

    componentDidMount() {
        const naver = window.naver;
        const mapDiv = document.getElementById('map');
        const {year, month, day, time, isCrop, type, UIActions} = this.props;

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
            center: new naver.maps.Point(75, 60),
            zoom: 3,
            minZoom: 3,
            background: '#000000',
            logoControl: false,
            mapTypes: new naver.maps.MapTypeRegistry({
                'RGB': getMapType(type, year, month, day, time),
            }),
            mapTypeId: 'RGB',
            darktheme: false,
            mapTypeControl: false,
            mapTypeControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
                style: naver.maps.MapTypeControlStyle.DROPDOWN
            },
            disableDoubleClickZoom: true,
            disableDoubleTapZoom: true
        }));

        var drawingManager = !isCrop ? null : new naver.maps.drawing.DrawingManager({
            map: this.props.map,
            drawingControl: [naver.maps.drawing.DrawingMode.RECTANGLE],
            drawingControlOptions: {
                position: naver.maps.Position.TOP_LEFT,
                style: naver.maps.drawing.DrawingStyle.HORIZONTAL
            },
            controlPointOptions: {
                anchorPointOptions: {
                    radius: 5,
                    fillColor: '#ff0000',
                    strokeColor: '#ff0000',
                    strokeWeight: 1
                },
                midPointOptions: {
                    radius: 4,
                    fillColor: '#ff0000',
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                    fillOpacity: 0.3
                }
            },
            rectangleOptions: {
                fillColor: '#ff0000',
                fillOpacity: 0.3,
                strokeWeight: 3,
                strokeColor: '#ff0000'
            }
        });
    }

    render() {
        return (
            <Map/>
        );
    };
}

export default connect((state) => ({
        map: state.ui.get('map'),
        year: state.ui.getIn(['info', 'year']),
        month: state.ui.getIn(['info', 'month']),
        day: state.ui.getIn(['info', 'day']),
        time: state.ui.getIn(['info', 'time']),
        type: state.ui.getIn(['info', 'type']),
        values: state.ui.get('values').toJS(),
        zoom: state.ui.getIn(['info', 'zoom']),
        isCrop: state.ui.get('isCrop')
    }), (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(MapContainer);