import { createSelector } from "reselect"
import { RootStateType } from "./redux-store"

export const getUsersData = (state: RootStateType) => {
    return state.usersReducer.usersData
}

export const getPageSize = (state: RootStateType) => {
    return state.usersReducer.pageSize
}

export const getTotalUsersCount = (state: RootStateType) => {
    return state.usersReducer.totalUsersCount
}

export const getPagesCount = createSelector(getPageSize, getTotalUsersCount, (pageSize, totalUsersCount) => {
    return Math.ceil(totalUsersCount / pageSize)
})

export const getPortionSize = (state: RootStateType) => {
    return state.usersReducer.portionSize
}

export const getPortionsCount = createSelector(getPortionSize, getPagesCount, (portionSize, pagesCount) => {
    return Math.ceil(pagesCount / portionSize)
})

export const getCurrentPage = (state: RootStateType) => {
    return state.usersReducer.currentPage
}

export const getIsFetching = (state: RootStateType) => {
    return state.usersReducer.isFetching
}

export const getFollowingInProgress = (state: RootStateType) => {
    return state.usersReducer.followingInProgress
}