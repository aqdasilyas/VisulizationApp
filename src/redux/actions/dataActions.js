// src/redux/actions/dataActions.js
import { getData } from '../../helpingFunc/apiCalling';
import { GET_SENSORS, GET_SINGLE_SENSORS, GET_WEATHER_DATA } from '../types/index';

// ****************** Save data in Reducer acording to the Type ******************
export const receiveData = (type, data) => {
    return {
        type,
        payload: data,
    };
};

// ****************** fetch all Sensors ******************
export const fetchSensors = () => {
    return async (dispatch) => {
        const responseback = await getData('sensor')
        if (responseback.status == 200) {
            console.log("GET_SENSORS: ", responseback.data)
            const senorArray = responseback.data
            dispatch(fetchSingleSensors(senorArray[0]))
            dispatch(receiveData(GET_SENSORS, senorArray));
        }
    };
};

// ****************** fetch single Sensors ******************
export const fetchSingleSensors = (sensor_id) => {
    return async (dispatch) => {
        const responseback = await getData(`sensor/${sensor_id}`)
        if (responseback.status == 200) {
            console.log("GET_SINGLE_SENSORS: ", responseback.data)
            dispatch(receiveData(GET_SINGLE_SENSORS, responseback.data));
        }
    };
};

// ****************** fetch Weather Data ******************
export const fetchWeatherData = () => {
    return async (dispatch) => {
        const responseback = await getData(`weather`)
        console.log("GET_WEATHER_DATA: ", responseback)
    };
};
