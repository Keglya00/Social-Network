import React from "react";
import { connect } from "react-redux";
import { getUsersThunkCreator, unfollowThunkCreator, followThunkCreator, setCurrentPage, UsersDataType } from "../../redux/usersReducer.ts";
import Users from './Users.tsx'
import Preloader from "../Common/Preloader/Preloader.jsx";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getPagesCount, getPortionSize, getPortionsCount, getUsersData } from "../../redux/usersSelectors.ts";
import { RootStateType } from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    pagesCount: number,
    pageSize: number,
    currentPage: number,
    usersData: Array<UsersDataType>,
    isFetching: boolean,
    followingInProgress: Array<number>,
    portionsCount: number,
    portionSize: number
}

type MapDispatchToPropsType = {
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    setCurrentPage: (page: number) => void,
    followThunkCreator: (userId: number) => void,
    unfollowThunkCreator: (userId: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersApiComponent extends React.PureComponent<PropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    } 

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page)
        this.props.getUsersThunkCreator(page, this.props.pageSize)
    }

    onUserFollow = (userId: number) => {
        this.props.followThunkCreator(userId)
    }

    onUserUnfollow = (userId: number) => {
        this.props.unfollowThunkCreator(userId)
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
        portionSize: getPortionSize(state)
    }
}

const UsersContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {} , RootStateType>(mapStateToProps, { getUsersThunkCreator, unfollowThunkCreator, followThunkCreator, setCurrentPage })(UsersApiComponent)

export default UsersContainer