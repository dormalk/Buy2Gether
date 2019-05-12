import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import ListReducer from './ListReducer';

export default combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    lists: ListReducer
});