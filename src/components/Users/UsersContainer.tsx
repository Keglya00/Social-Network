import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsersThunkCreator, unfollowThunkCreator, followThunkCreator, setCurrentPage, UsersDataType, setTerm } from "../../redux/usersReducer.ts";
import Users from './Users.tsx'
import Preloader from "../Common/Preloader/Preloader.tsx";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getPagesCount, getPortionSize, getPortionsCount, getTerm, getUsersData } from "../../redux/usersSelectors.ts";
import { RootStateType } from "../../redux/redux-store.ts";
import { useNavigate, useSearchParams } from "react-router-dom";

type MapStateToPropsType = {
    pagesCount: number,
    pageSize: number,
    currentPage: number,
    usersData: Array<UsersDataType>,
    isFetching: boolean,
    followingInProgress: Array<number>,
    portionsCount: number,
    portionSize: number,
    term: string
}

type MapDispatchToPropsType = {
    getUsersThunkCreator: (currentPage: number, pageSize: number, term: string) => void
    setCurrentPage: (page: number) => void,
    followThunkCreator: (userId: number) => void,
    unfollowThunkCreator: (userId: number) => void,
    setTerm: (term: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const UsersApiComponent: React.FC<PropsType> = (props) => {

    const[searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const parsed = Object.fromEntries(searchParams) as {term: string, page: string, count: string}

        let actualPage = props.currentPage
        if(parsed.page){actualPage = Number(parsed.page)}
        let actualTerm = props.term
        if(parsed.term){actualTerm = parsed.term}

        props.getUsersThunkCreator(actualPage, props.pageSize, actualTerm)
    }, [])

    const navigate = useNavigate()
    useEffect(() => {
        navigate({
            pathname:'/users',
            search: `?term=${props.term}&count=${props.pageSize}&page=${props.currentPage}`
        })
    }, [props.term, props.currentPage, props.pageSize])

    let onPageChanged = (page: number) => {
        props.setCurrentPage(page)
        props.getUsersThunkCreator(page, props.pageSize, props.term)
    }

    let onUserFollow = (userId: number) => {
        props.followThunkCreator(userId)
    }

    let onUserUnfollow = (userId: number) => {
        props.unfollowThunkCreator(userId)
    }

    let onTermChanged = (term: string) => {
        props.setTerm(term)
        props.setCurrentPage(1)
        props.getUsersThunkCreator(1, props.pageSize, term)
    }

    return (
            <>
                {props.isFetching ? <Preloader /> : null}
                <Users
                    pagesCount={props.pagesCount}
                    currentPage={props.currentPage}
                    usersData={props.usersData}
                    onUserFollow={onUserFollow}
                    onUserUnfollow={onUserUnfollow}
                    isFetching={props.isFetching}
                    onPageChanged={onPageChanged}
                    followingInProgress={props.followingInProgress}
                    portionsCount={props.portionsCount}
                    portionSize={props.portionSize}
                    onTermChanged={onTermChanged}
                    term={props.term}
                />
            </>
    )       
}

 
let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        usersData: getUsersData(state),
        pagesCount : getPagesCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionsCount: getPortionsCount(state),
        portionSize: getPortionSize(state),
        term: getTerm(state)
    }
}

const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {} , RootStateType>(mapStateToProps, { getUsersThunkCreator, unfollowThunkCreator, followThunkCreator, setCurrentPage, setTerm })(UsersApiComponent)

export default React.memo(UsersContainer)