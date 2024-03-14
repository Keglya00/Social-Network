import { getLoginData, getUserProfile, login, logout } from "./../API"; 

const SET_USER_DATA = 'auth/SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING'
const SET_USER_AVATAR= 'auth/SET_USER_AVATAR'
const DELETE_USER_DATA ='auth/DELETE_USER_DATA'
const STOP_SUBMIT = 'auth/STOP_SUBMIT'

let initialState = {
    data: null,
    userAvatar: null,
    isAuth: false,
    isFetching: false,
    errorMessage: null
}

const authReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_USER_DATA: {
            return {
                ...state,
                data: action.data,
                isAuth: action.data.login ? true : false
            }
        }
        case DELETE_USER_DATA: {
            return {
                ...state,
                isAuth: false
            }
        }
        case TOGGLE_IS_FETCHING: {
            return{
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_USER_AVATAR: {
            return{
                ...state,
                userAvatar: action.avatar
            }
        }
        case STOP_SUBMIT: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        default:
            return state
    }
}

export const setUserData = (data) => {return{type: SET_USER_DATA, data}}
export const stopSubmit = (errorMessage) => {return {type: STOP_SUBMIT, errorMessage}}
export const deleteUserData = () => {return{type: DELETE_USER_DATA}}
export const toggleIsFetching = (isFetching) => {return{type: TOGGLE_IS_FETCHING, isFetching}}
export const setUserAvatar = (avatar) => {return{type: SET_USER_AVATAR, avatar}}
export const getLoginDataThunkCreator = () => async (dispatch) => {
    let data = await getLoginData()
    dispatch(setUserData(data.data))
    dispatch(toggleIsFetching(false))
}
export const loginThunkCreator = (email, password, rememberMe) => async (dispatch) => {
    let data = await login(email, password, rememberMe)
    if(data.resultCode === 0){
        dispatch(getLoginDataThunkCreator())
    } else {
        dispatch(stopSubmit(data.messages[0]))
    }
}
export const logoutThunkCreator = () => async (dispatch) => {
    let data = await logout()
    if(data.resultCode === 0){
        dispatch(deleteUserData())
    }
}
export const setUsersAvatarThunkCreator = (userId) => async (dispatch) => {
    let data = await getUserProfile(userId)
    dispatch(setUserAvatar(data.photos.small))
}

export default authReducer