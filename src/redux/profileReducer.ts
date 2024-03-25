import {getUserProfile, getUserStatus, saveAboutMe, saveUserAvatar, updateUserStatus} from '../API'
import { ThunkAction } from 'redux-thunk';
import { RootStateType } from './redux-store';

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE '
const SET_USER_STATUS = 'SET_USER_STATUS '
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const DELETE_POST = 'DELETE_POST'
const SET_USER_AVATAR = 'SET_USER_AVATAR'
const SET_ABOUT_ME = 'SET_ABOUT_ME'

export type PostType = {
    message: string,
    id: number,
    likes: number
}
type ContactsType = {
    github: string,
    vk: string,
    facebook: string
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileType = {
    userId: number,
    aboutMe: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

let initialState = {
    postsData: [
        {message:'How are you', id: 1, likes: 10},
        {message:'It is my first post', id: 2, likes: 22},
        {message:'Hello world', id: 3, likes: 228}
    ] as Array<PostType> ,
    profile: null as null | ProfileType, 
    isFetching: false,
    status: ''
}

type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionType) => {

    switch(action.type){
        case ADD_POST: {
            let newPost = {id: 4, message: action.newPost, likes: 0}
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case TOGGLE_IS_FETCHING: {
            return{
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_USER_STATUS: {
            return{
                ...state,
                status: action.status
            }
        }
        case SET_USER_AVATAR: {
            return{
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        case SET_ABOUT_ME: {
            return{
                ...state,
                profile: {...state.profile, aboutMe: action.aboutMe}
            }
        }
        case DELETE_POST: {
            return{
                ...state,
                postsData: state.postsData.filter(post => post.id != action.postId)
            }        
        }
        default:
            return state
    }
}

type ActionType = AddPostActionCreatorType | DeletePostType | SetUserProfileType | ToggleIsFetchingType | GetStatusType | SetAboutMeType | GetAvatarType
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionType>

type AddPostActionCreatorType = {type: typeof ADD_POST, newPost: string}
export const addPostActionCreator = (newPost: string): AddPostActionCreatorType => {return {type: ADD_POST, newPost}}
type DeletePostType = {type: typeof DELETE_POST, postId: number}
export const deletePost = (postId: number): DeletePostType => {return {type: DELETE_POST, postId}}
type SetUserProfileType = {type: typeof SET_USER_PROFILE, profile: ProfileType}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => {return {type: SET_USER_PROFILE, profile}}
type ToggleIsFetchingType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean} 
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {return{type: TOGGLE_IS_FETCHING, isFetching}}
type GetStatusType = {type: typeof SET_USER_STATUS, status: string}
export const getStatus = (status: string): GetStatusType => {return {type:SET_USER_STATUS, status}}
type SetAboutMeType = {type: typeof SET_ABOUT_ME, aboutMe: string}
export const setAboutMe = (aboutMe: string): SetAboutMeType => {return {type:SET_ABOUT_ME, aboutMe}}
type GetAvatarType = {type: typeof SET_USER_AVATAR, photos: PhotosType}
export const getAvatar = (photos: PhotosType): GetAvatarType => {return {type: SET_USER_AVATAR, photos }}

export const getUsersProfile = (userId: number): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let data = await getUserProfile(userId)
    dispatch(setUserProfile(data))
    dispatch(toggleIsFetching(false)) 
    data = await getUserStatus(userId)
    dispatch(getStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await updateUserStatus(status)
    if(data.data.resultCode === 0) {
        dispatch(getStatus(status))
    }
}
export const saveAvatar = (avatar: any): ThunkType => async (dispatch) => {
    let data = await saveUserAvatar(avatar)
    if(data.data.resultCode === 0) {
        dispatch(getAvatar(data.data.data.photos))
    }
}

export const uploadAboutMe = (profile: ProfileType, aboutMe: string): ThunkType => async (dispatch) => {
    let updatedProfile = {...profile, aboutMe: aboutMe}
    let data = await saveAboutMe(updatedProfile)
}
export default profileReducer