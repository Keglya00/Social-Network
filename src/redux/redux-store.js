import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import { composeWithDevTools } from "@redux-devtools/extension";
import profileReducer from './profileReducer.js';
import dialogsReducer from './dialogsReducer.ts';
import usersReducer from './usersReducer.js';
import appReducer from './appReducer.ts'
import authReducer from './authReducer.ts';
import formReducer from './formReducer.js'
import {thunk} from 'redux-thunk';

let reducers = combineReducers({profileReducer, dialogsReducer, usersReducer, authReducer, appReducer, form: formReducer})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store