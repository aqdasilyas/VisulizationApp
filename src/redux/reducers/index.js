import { combineReducers } from 'redux';
import sensorReducer from './sensorReducer';

export default combineReducers({
    sensor: sensorReducer,
});
