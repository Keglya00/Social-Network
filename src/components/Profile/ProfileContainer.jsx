import React from "react";
import { connect } from "react-redux";
import { getUsersProfile, updateStatus, saveAvatar, uploadAboutMe, setAboutMe } from './../../redux/profileReducer.ts';
import Profile from './Profile';
import Preloader from "../Common/Preloader/Preloader";
import withRouter from './../../withRouter';
import { withAuthReirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileApiComponent extends React.PureComponent {

    renderProfile = () => {
        let userId = this.props.params.userId
        this.props.getUsersProfile(userId)
    }

    componentDidMount() {
        this.renderProfile()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.userId != this.props.params.userId){
            this.renderProfile()           
        }           
    }

    setUserAboutMe = (aboutMe) => {
        this.props.setAboutMe(aboutMe)
        this.props.uploadAboutMe(this.props.profile, aboutMe)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                {this.props.profile ? <Profile 
                profile={this.props.profile} 
                saveAvatar={this.props.saveAvatar} 
                isOwner={this.props.params.userId == this.props.ownerId} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus}
                setUserAboutMe={this.setUserAboutMe}
                /> : null }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ownerId: state.authReducer.data.id,
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        isFetching: state.profileReducer.isFetching
    }
}

const ProfileContainer = compose(connect(mapStateToProps, {getUsersProfile, uploadAboutMe, updateStatus, saveAvatar, setAboutMe }), withAuthReirect, withRouter )(ProfileApiComponent)

export default ProfileContainer