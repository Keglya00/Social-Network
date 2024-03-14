import React from "react";
import { connect } from "react-redux";
import { getUsersProfile, updateStatus } from './../../redux/profileReducer';
import Profile from './Profile';
import Preloader from "../Common/Preloader/Preloader";
import withRouter from './../../withRouter';
import { withAuthReirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileApiComponent extends React.PureComponent {
    
    componentDidMount() {
        let userId = this.props.params.userId
        this.props.getUsersProfile(userId)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                {this.props.profile ? <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} /> : null }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        isFetching: state.profileReducer.isFetching
    }
}

const ProfileContainer = compose(connect(mapStateToProps, {getUsersProfile, updateStatus }), withAuthReirect, withRouter )(ProfileApiComponent)

export default ProfileContainer