import React from "react";
import { connect } from "react-redux";
import { getUsersThunkCreator, unfollowThunkCreator, followThunkCreator, setCurrentPage, UsersDataType, setTerm } from "../../redux/usersReducer.ts";
import Users from './Users.tsx'
import Preloader from "../Common/Preloader/Preloader.tsx";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getPagesCount, getPortionSize, getPortionsCount, getTerm, getUsersData } from "../../redux/usersSelectors.ts";
import { RootStateType } from "../../redux/redux-store.ts";

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

class UsersApiComponent extends React.PureComponent<PropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize, this.props.term)
    } 

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page)
        this.props.getUsersThunkCreator(page, this.props.pageSize, this.props.term)
    }

    onUserFollow = (userId: number) => {
        this.props.followThunkCreator(userId)
    }

    onUserUnfollow = (userId: number) => {
        this.props.unfollowThunkCreator(userId)
    }

    onTermChanged = (term: string) => {
        this.props.setTerm(term)
        this.props.setCurrentPage(1)
        this.props.getUsersThunkCreator(1, this.props.pageSize, term)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    pagesCount={this.props.pagesCount}
                    currentPage={this.props.currentPage}
                    usersData={this.props.usersData}
                    onUserFollow={this.onUserFollow}
                    onUserUnfollow={this.onUserUnfollow}
                    isFetching={this.props.isFetching}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
                    portionsCount={this.props.portionsCount}
                    portionSize={this.props.portionSize}
                    onTermChanged={this.onTermChanged}
                />
            </>
        )       
    }
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

export default UsersContainer