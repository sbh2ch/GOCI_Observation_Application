import React, {Component} from 'react';
import Map from '../components/Map/Map';
import axios from 'axios';
import {connect} from 'react-redux';
import * as uiActions from '../modules/ui';
import {bindActionCreators} from 'redux';

class MapContainer extends Component {
    componentDidMount() {
        const $ = window.jQuery;
        const naver = window.naver;
        const mapDiv = document.getElementById('map');
        const {year, month, day, time, isCrop, type, valueArr, latArr, lonArr} = this.props;

        const zooms = [6, 12, 25, 50];
        for (let i = 0; i < zooms.length; i++) {
            for (let j = 0; j < zooms[i]; j++) {
                valueArr[i][j] = new Array(zooms[i]);
                latArr[i][j] = new Array(zooms[i]);
                lonArr[i][j] = new Array(zooms[i]);
            }
        }


        const tileSize = new naver.maps.Size(200, 200),
            proj = {
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
            },
            getMapType = function (type) {
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
                        tileSet: 'http://222.236.46.44/img/{year}/{month}/{day}/{time}/{z}/{type}/{x}-{y}.JPG'.replace('{type}', type.toUpperCase()).replace('{year}', year).replace('{month}', month).replace('{day}', day).replace('{time}', time),
                        uid: ''
                    });

                return new naver.maps.ImageMapType(mapTypeOption);
            };

        const map = new naver.maps.Map(mapDiv, {
            center: new naver.maps.Point(75, 60),
            zoom: 3,
            minZoom: 3,
            background: '#000000',
            logoControl: false,
            mapTypes: new naver.maps.MapTypeRegistry({
                'RGB': getMapType('RGB'),
                'CDOM': getMapType('CDOM'),
                'TSS': getMapType('TSS'),
                'CHL': getMapType('CHL')
            }),
            mapTypeId: 'RGB',
            mapTypeControl: true,
            mapTypeControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
                style: naver.maps.MapTypeControlStyle.DROPDOWN
            },
            disableDoubleClickZoom: true,
            disableDoubleTapZoom: true
        });

        map.setCursor('pointer');


        var drawingManager = !isCrop ? null : new naver.maps.drawing.DrawingManager({
            map: map,
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

        const marker = isCrop ? null : (type === 'RGB') ? null : new naver.maps.Marker({
            icon: {
                url: 'assets/img/marker.png',
                size: new naver.maps.Size(25, 34),
                scaledSize: new naver.maps.Size(25, 34),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(12, 34)
            },
            position: new naver.maps.Point(62, 66.875),
            map: map
        });


        naver.maps.Event.addListener(map, 'click', function (e) {
            marker.setPosition(e.point);


            const getLatLon = async (arrX, arrY, zoom, posX, posY) => {
                try {
                    await axios.get('http://kosc.kr:8080/api/lonlat/' + arrX + '-' + arrY + '/' + zoom)
                        .then(response => {
                            console.log(response);
                            // lonArr[zoom - 3][arrX][arrY] = response.data[0];
                            // latArr[zoom - 3][arrX][arrY] = response.data[1];
                            // console.log(lonArr[zoom - 3][arrX][arrY][posX][posY], latArr[zoom - 3][arrX][arrY][posX][posY]);
                        });
                } catch (e) {
                    console.log(e);
                }
            };

            // const getValue = async () => {
            //     try {
            //
            //     }
            // }

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

            if (valueArr[zoom - 3][arrX][arrY] === undefined) {
                if (latArr[zoom - 3][arrX][arrY] === undefined) {
                    getLatLon(arrX, arrY, zoom, posX, posY);


                    // console.log(lonArr[zoom - 3][arrX][arrY][posX][posY], latArr[zoom - 3][arrX][arrY][posX][posY]);
                }
                // $.ajax({
                //     url: '/api/' + state.year + '-' + state.month + '-' + state.day + '-' + state.time + '/' + arrX + '-' + arrY + '/' + zoom + '/' + map.getMapTypeId(),
                //     method: 'GET',
                //     dataType: 'JSON',
                //     success: function (data) {
                //         state.valueArr[zoom - 3][arrX][arrY] = data;
                //         $("#result").html('value : ' + valueArr[zoom - 3][arrX][arrY][posX][posY] + '<br/>lon : ' + lonArr[zoom - 3][arrX][arrY][posX][posY] + '<br/>lat : ' + latArr[zoom - 3][arrX][arrY][posX][posY]);
                //     },
                //     error: function () {
                //         alert('data load error occurred');
                //     }
                // });
            } else {
                console.log('else');
                // $("#result").html('value : ' + valueArr[zoom - 3][arrX][arrY][posX][posY] + '<br/>lon : ' + lonArr[zoom - 3][arrX][arrY][posX][posY] + '<br/>lat : ' + latArr[zoom - 3][arrX][arrY][posX][posY]);
            }
        })
    }

    render() {
        return (
            <Map/>
        );
    };
}

MapContainer.defaultProps = {
    year: 2017,
    month: '09',
    day: '10',
    time: '07',
    type: 'CHL',
    isCrop: false,
    valueArr: [new Array(6), new Array(12), new Array(25), new Array(50)],
    latArr: [new Array(6), new Array(12), new Array(25), new Array(50)],
    lonArr: [new Array(6), new Array(12), new Array(25), new Array(50)]
};

export default connect((state) => ({
        year: state.ui.getIn(['info', 'year']),
        month: state.ui.getIn(['info', 'month']),
        day: state.ui.getIn(['info', 'day']),
        time: state.ui.getIn(['info', 'time']),
        type: state.ui.getIn(['info', 'type']),
        values: state.ui.get('values')
    }), (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(MapContainer);