import {getUserProfile, getUserStatus, updateUserStatus} from './../API'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE '
const SET_USER_STATUS = 'SET_USER_STATUS '
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const DELETE_POST = 'DELETE_POST'

let initialState = {
    postsData: [
        {message:'How are you', id: 1, likes: 10},
        {message:'It is my first post', id: 2, likes: 22},
        {message:'Ya lublu mefedron)', id: 3, likes: 228}
    ],
    profile: null, 
    isFetching: false,
    status: ''
}

const profileReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_POST: {
            let newPost = {id: 4, message: action.newPost, likes: 0}
            debugger
            return {
                ...state,
                newPostText: '',
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

export const addPostActionCreator = (newPost) => {return {type: ADD_POST, newPost}}
export const deletePost = (postId) => {return {type: DELETE_POST, postId}}
export const setUserProfile = (profile) => {return {type: SET_USER_PROFILE, profile}}
export const toggleIsFetching = (isFetching) => {return{type: TOGGLE_IS_FETCHING, isFetching}}
export const getStatus = (status) => {return {type:SET_USER_STATUS, status}}
export const getUsersProfile = (userId) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let data = await getUserProfile(userId)
    dispatch(setUserProfile(data))
    dispatch(toggleIsFetching(false)) 
    data = await getUserStatus(userId)
    dispatch(getStatus(data))
}
export const updateStatus = (status) => async (dispatch) => {
    let data = await updateUserStatus(status)
    if(data.resultCode === 0) {
        dispatch(getStatus(status))
    }
}
export default profileReducer