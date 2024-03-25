import {getUsers, onUserFollow, onUserUnfollow} from '../API'
import { ThunkAction } from 'redux-thunk'
import { RootStateType } from './redux-store'
import { Dispatch } from 'redux'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS'

type PhotosType = {
    large: string,
    small: string
}
export type UsersDataType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}
let initialSate = {
    usersData: [] as Array<UsersDataType>,
    portionSize: 5,
    pageSize: 6,
    totalUsersCount: 150,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialSate

const usersReducer = (state: InitialStateType = initialSate, action: ActionType): InitialStateType => {
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

type ActionType = SetUserType | FollowType | UnfollowType | SetTotalUsersCount | SetCurrentPageType | ToggleIsFetchingType | ToggleFollowingInProgressType
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionType>

const followUnfollowFlow = async (dispatch: Dispatch<ActionType>, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowType | UnfollowType) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let data = await apiMethod(userId)
    if(data.resultCode === 0){
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}

type SetUserType = {type: typeof SET_USERS, users: Array<UsersDataType>}
export const setUsers = (users: Array<UsersDataType>): SetUserType => {return{type: SET_USERS, users}}
type FollowType = {type: typeof FOLLOW, userId: number}
export const follow = (userId: number): FollowType => {return{type: FOLLOW, userId}}
type UnfollowType = {type: typeof UNFOLLOW, userId: number}
export const unFollow = (userId: number): UnfollowType => {return{type: UNFOLLOW, userId}}
type SetCurrentPageType = {type: typeof SET_CURRENT_PAGE, page: number}
export const setCurrentPage = (page: number): SetCurrentPageType => {return{type: SET_CURRENT_PAGE, page}}
type SetTotalUsersCount = {type: typeof SET_TOTAL_USERS_COUNT, totalCount: number }
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCount => {return{type: SET_TOTAL_USERS_COUNT, totalCount}}
type ToggleIsFetchingType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {return{type: TOGGLE_IS_FETCHING, isFetching}}
type ToggleFollowingInProgressType = {type: typeof FOLLOWING_IN_PROGRESS, isFetching: boolean, userId: number }
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressType => {return{type: FOLLOWING_IN_PROGRESS, isFetching, userId}}

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let data = await getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}
export const followThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, onUserFollow, follow)
}
export const unfollowThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, onUserUnfollow, unFollow)
}
export default usersReducer