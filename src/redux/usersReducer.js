import {getUsers, onUserFollow, onUserUnfollow} from './../API'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'

let initialSate = {
    usersData: [],
    portionSize: 5,
    pageSize: 6,
    totalUsersCount: 150,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialSate, action) => {
    switch(action.type){
        case FOLLOW: {
            return{
                ...state,
                usersData: state.usersData.map((user) => user.id === action.userId ? {...user, followed: true} : user )
            }
        }
        case UNFOLLOW: {
            return{
                ...state,
                usersData: state.usersData.map((user) => user.id === action.userId ? {...user, followed: false} : user )
            }
        }
        case SET_USERS: {
            return{
                ...state,
                usersData:  [...action.users],
            }
        }
        case SET_CURRENT_PAGE: {
            debugger
            return{
                ...state,
                currentPage: action.page
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return{
                ...state,
                totalUsersCount: action.totalCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return{
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOWING_IN_PROGRESS: {
            return{
                ...state,
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let data = await apiMethod(userId)
    if(data.resultCode === 0){
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}

export const setUsers = (users) => {return{type: SET_USERS, users}}
export const follow = (userId) => {return{type: FOLLOW, userId}}
export const unFollow = (userId) => {return{type: UNFOLLOW, userId}}
export const setCurrentPage = (page) => {return{type: SET_CURRENT_PAGE, page}}
export const setTotalUsersCount = (totalCount) => {return{type: SET_TOTAL_USERS_COUNT, totalCount}}
export const toggleIsFetching = (isFetching) => {return{type: TOGGLE_IS_FETCHING, isFetching}}
export const toggleFollowingInProgress = (isFetching, userId) => {return{type: FOLLOWING_IN_PROGRESS, isFetching, userId}}
export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let data = await getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}
export const followThunkCreator = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, onUserFollow, follow)
}
export const unfollowThunkCreator = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, onUserUnfollow, unFollow)
}
export default usersReducer