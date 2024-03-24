import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import { composeWithDevTools } from "@redux-devtools/extension";
import profileReducer from './profileReducer.ts';
import dialogsReducer from './dialogsReducer.ts';
import usersReducer from './usersReducer.ts';
import appReducer from './appReducer.ts'
import authReducer from './authReducer.ts';
import {thunk} from 'redux-thunk';

let rootReducer = combineReducers({profileReducer, dialogsReducer, usersReducer, authReducer, appReducer})

type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<RootReducerType>
//@ts-ignore
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) // ts wants to replace createstore with configureStore

export default store