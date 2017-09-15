import axios from 'axios';

export const getLatLon = ({arrX, arrY, zoom}) => axios.get(`http://kosc.kr:8080/api/lonlat/${arrX}-${arrY}/${zoom}`);
export const getValue = ({year, month, day, time, arrX, arrY, zoom, type}) => axios.get(`http://kosc.kr:8080/api/${year}-${month}-${day}-${time}/${arrX}-${arrY}/${zoom}/${type}`);
