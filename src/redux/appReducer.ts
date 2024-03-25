import { ThunkAction } from 'redux-thunk';
import { getLoginDataThunkCreator } from './authReducer.ts';
import { RootStateType } from './redux-store.ts';

const INITIALIZED_SUCCESS: string = 'INITIALIZED_SUCCESS'

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
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

type ActionType = InitializedSuccessType
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionType>

type InitializedSuccessType = {type: typeof INITIALIZED_SUCCESS}

export const initializedSuccess = (): InitializedSuccessType => {return{type: INITIALIZED_SUCCESS }}
export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getLoginDataThunkCreator())
    promise.then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer