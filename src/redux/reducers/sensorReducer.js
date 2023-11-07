import { GET_SENSORS, GET_SINGLE_SENSORS, GET_WEATHER_DATA } from '../types/index';

const initialState = {
    allSensors: [],
    singleSensor: {},
    weatherdata: {}
};

// Specify the types for the state and action in the reducer function
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SENSORS:
            return {
                ...state,
                allSensors: action.payload,
            };
        case GET_SINGLE_SENSORS:
            return {
                ...state,
                singleSensor: action.payload,
            };
        case GET_WEATHER_DATA:
            return {
                ...state,
                weatherdata: action.payload,
            };
        default:
            return state;
    }
};
