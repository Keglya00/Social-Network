import { getCaptchaUrl, getLoginData, getUserProfile, login, logout } from "../API"; 

const SET_USER_DATA = 'auth/SET_USER_DATA'
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING'
const SET_USER_AVATAR= 'auth/SET_USER_AVATAR'
const DELETE_USER_DATA ='auth/DELETE_USER_DATA'
const STOP_SUBMIT = 'auth/STOP_SUBMIT'
const SET_CAPTCHA = 'auth/SET_CAPTCHA'

export type DataType = {
    email: string,
    id: number,
    login: string
}

type InitialStateType = {
    data: null | DataType,
    userAvatar: null | string,
    isAuth: boolean,
    isFetching: boolean,
    errorMessage: null | string,
    captcha: string | null
}

let initialState: InitialStateType = {
    data: null,
    userAvatar: null,
    isAuth: false,
    isFetching: false,
    errorMessage: null,
    captcha: null
}

const authReducer = (state: InitialStateType = initialState, action: any) => {

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
        case SET_CAPTCHA: {
            return{
                ...state,
                captcha: action.captcha
            }
        }
        default:
            return state
    }
}

type SetUserDataType = {type: typeof SET_USER_DATA, data: DataType}
export const setUserData = (data: DataType): SetUserDataType => {return{type: SET_USER_DATA, data}}
type StopSubmitType = {type: typeof STOP_SUBMIT, errorMessage: string}
export const stopSubmit = (errorMessage: string): StopSubmitType => {return {type: STOP_SUBMIT, errorMessage}}
type DeteteUserDataType = {type: typeof DELETE_USER_DATA}
export const deleteUserData = (): DeteteUserDataType => {return{type: DELETE_USER_DATA}}
type ToggleIsFetchingType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {return{type: TOGGLE_IS_FETCHING, isFetching}}
type SetUserAvatarType = {type: typeof SET_USER_AVATAR, avatar: string}
export const setUserAvatar = (avatar: string): SetUserAvatarType => {return{type: SET_USER_AVATAR, avatar}}
type SetCaptchaType = {type: typeof SET_CAPTCHA, captcha: string}
export const setCaptcha = (captcha: string): SetCaptchaType  => {return{type: SET_CAPTCHA, captcha}}
export const getLoginDataThunkCreator = () => async (dispatch: any) => {
    let data = await getLoginData()
    dispatch(setUserData(data.data))
    dispatch(toggleIsFetching(false))
}
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await login(email, password, rememberMe, captcha)
    if(data.resultCode === 0){
        dispatch(getLoginDataThunkCreator())
    } else if(data.resultCode === 1){
        dispatch(stopSubmit(data.messages[0]))
    } else {
        dispatch(getCaptcha())
        dispatch(stopSubmit(data.messages[0]))
    }
}   

export const logoutThunkCreator = () => async (dispatch: any) => {
    let data = await logout()
    if(data.resultCode === 0){
        dispatch(deleteUserData())
    }
}
export const setUsersAvatarThunkCreator = (userId: number) => async (dispatch: any) => {
    let data = await getUserProfile(userId)
    dispatch(setUserAvatar(data.photos.small))
}
export const getCaptcha = () => async (dispatch: any) => {
    let data = await getCaptchaUrl()
    dispatch(setCaptcha(data.data.url))
}

export default authReducer