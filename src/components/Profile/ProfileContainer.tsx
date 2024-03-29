import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { getUsersProfile, updateStatus, saveAvatar, uploadAboutMe, setAboutMe, ProfileType } from '../../redux/profileReducer.ts';
import Profile from './Profile.tsx';
import Preloader from "../Common/Preloader/Preloader.tsx";
import withRouter from '../../hoc/withRouter.tsx';
import { withAuthReirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { RootStateType } from "../../redux/redux-store.ts";

type OwnPropsType = {
    params: {
        userId: string
    }
}

type MapStateToPropsType = {
    ownerId: number
    profile: ProfileType,
    status: string,
    isFetching: boolean    
}

type MapDispatchToPropsType = {
    getUsersProfile: (userId: number) => void,
    updateStatus: (status: string) => void,
    setAboutMe: (aboutMe: string) => void,
    uploadAboutMe: (profile: ProfileType, aboutMe: string) => void,
    saveAvatar: (avatar: any) => void
}   

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class ProfileApiComponent extends React.PureComponent<PropsType> {
    renderProfile = () => {
        let userId = this.props.params.userId
        this.props.getUsersProfile(Number(userId))
    }

    componentDidMount() {
        this.renderProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.params.userId !== this.props.params.userId){
            this.renderProfile()           
        }           
    }

    setUserAboutMe = (aboutMe: string) => {
        this.props.setAboutMe(aboutMe)
        this.props.uploadAboutMe(this.props.profile, aboutMe)
    }

    render() {
        debugger
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                {this.props.profile.userId ? <Profile 
                profile={this.props.profile} 
                saveAvatar={this.props.saveAvatar} 
                isOwner={this.props.params.userId === this.props.ownerId.toString()} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus}
                setUserAboutMe={this.setUserAboutMe}
                /> : null }
            </>
        )
    }
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        ownerId: state.authReducer.data.id,
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        isFetching: state.profileReducer.isFetching
    }
}

const ProfileContainer = compose<ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootStateType>(mapStateToProps, {getUsersProfile, uploadAboutMe, updateStatus, saveAvatar, setAboutMe }), withAuthReirect, withRouter )(ProfileApiComponent)

export default ProfileContainer