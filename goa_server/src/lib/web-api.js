import axios from 'axios';

export const getLatLon = ({arrX, arrY, zoom}) => axios.get(`http://kosc.kr:8080/api/lonlat/${arrX}-${arrY}/${zoom}`);
export const getValue = ({year, month, day, time, arrX, arrY, zoom, type}) => axios.get(`http://kosc.kr:8080/api/${year}-${month}-${day}-${time}/${arrX}-${arrY}/${zoom}/${type}`);
export const createProduct = ({date, startX, startY, endX, endY, type, outputType}) =>axios.post(`http://kosc.kr:8080/api/products`, {date, startX, startY, endX, endY, type, outputType});
