import { createSelector } from "reselect"

export const getUsersData = (state) => {
    return state.usersReducer.usersData
}

export const getPageSize = (state) => {
    return state.usersReducer.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersReducer.totalUsersCount
}

export const getPagesCount = createSelector(getPageSize, getTotalUsersCount, (pageSize, totalUsersCount) => {
    return Math.ceil(totalUsersCount / pageSize)
})

export const getPortionSize = (state) => {
    return state.usersReducer.portionSize
}

export const getPortionsCount = createSelector(getPortionSize, getPagesCount, (portionSize, pagesCount) => {
    return Math.ceil(pagesCount / portionSize)
})

export const getCurrentPage = (state) => {
    return state.usersReducer.currentPage
}

export const getIsFetching = (state) => {
    return state.usersReducer.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.usersReducer.followingInProgress
}