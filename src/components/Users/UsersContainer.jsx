import React from "react";
import { connect } from "react-redux";
import { getUsersThunkCreator, unfollowThunkCreator, followThunkCreator, setCurrentPage } from "../../redux/usersReducer";
import Users from './Users'
import Preloader from "../Common/Preloader/Preloader";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getPagesCount, getPortionSize, getPortionsCount, getUsersData } from "../../redux/usersSelectors";

class UsersApiComponent extends React.PureComponent {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    } 

    onPageChanged = (page) => {
        this.props.setCurrentPage(page)
        this.props.getUsersThunkCreator(page, this.props.pageSize)
    }

    onUserFollow = (userId) => {
        this.props.followThunkCreator(userId)
    }

    onUserUnfollow = (userId) => {
        this.props.unfollowThunkCreator(userId)
    }

    render() {
        debugger
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
 
let mapStateToProps = (state) => {
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

const UsersContainer = connect(mapStateToProps, { getUsersThunkCreator, unfollowThunkCreator, followThunkCreator, setCurrentPage })(UsersApiComponent)

export default UsersContainer