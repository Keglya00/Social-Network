import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import { composeWithDevTools } from "@redux-devtools/extension";
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import usersReducer from './usersReducer';
import appReducer from './appReducer'
import authReducer from './authReducer';
import formReducer from './formReducer'
import {thunk} from 'redux-thunk';

let reducers = combineReducers({profileReducer, dialogsReducer, usersReducer, authReducer, appReducer, form: formReducer})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store