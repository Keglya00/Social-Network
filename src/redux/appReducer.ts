import { ThunkAction } from 'redux-thunk';
import { getLoginDataThunkCreator } from './authReducer.ts';
import { Action } from 'redux';

const INITIALIZED_SUCCESS: string = 'INITIALIZED_SUCCESS'

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default: {
            return state
        }
    }
}

type InitializedSuccessType = {type: typeof INITIALIZED_SUCCESS}
export const initializedSuccess = (): InitializedSuccessType => {return{type: INITIALIZED_SUCCESS }}
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getLoginDataThunkCreator())
    promise.then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer