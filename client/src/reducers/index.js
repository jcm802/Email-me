import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Combines all reducers
export default combineReducers({
    auth: authReducer
});