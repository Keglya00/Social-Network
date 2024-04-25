import React, { ComponentType, useEffect } from "react";
import { connect } from "react-redux";
import { getUsersProfile, updateStatus, saveAvatar, uploadAboutMe, setAboutMe, ProfileType } from '../../redux/profileReducer.ts';
import Profile from './Profile.tsx';
import Preloader from "../Common/Preloader/Preloader.tsx";
import withRouter from '../../hoc/withRouter.tsx';
import { withAuthReirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { RootStateType } from "../../redux/redux-store.ts";
import { addChat } from "../../redux/dialogsReducer.ts";
import { Navigate, useNavigate } from "react-router-dom";

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
    saveAvatar: (avatar: any) => void,
    addChat: (userId: number) => void
}   

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const ProfileApiComponent: React.FC<PropsType> = (props) => {
    let renderProfile = () => {
        let userId = props.params.userId
        props.getUsersProfile(Number(userId))
    }

    useEffect(() => {
        renderProfile()
    }, [])

    useEffect(() => {
        renderProfile()
    }, [props.params.userId])

    let setUserAboutMe = (aboutMe: string) => {
        props.setAboutMe(aboutMe)
        props.uploadAboutMe(props.profile, aboutMe)
    }

    const navigate = useNavigate()

    let onAddChat = () => {
        props.addChat(Number(props.params.userId))
        navigate({
            pathname: '/dialogs'
        })
    }

    return (
        <>
            {props.isFetching ? <Preloader /> : null}
            {props.profile.userId ? <Profile 
            profile={props.profile} 
            saveAvatar={props.saveAvatar} 
            isOwner={props.params.userId === props.ownerId.toString()} 
            status={props.status} 
            updateStatus={props.updateStatus}
            setUserAboutMe={setUserAboutMe}
            onAddChat={onAddChat}
            /> : null }
        </>
    )
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        ownerId: state.authReducer.data.id,
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        isFetching: state.profileReducer.isFetching
    }
}

const ProfileContainer = compose<ComponentType >(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootStateType>(mapStateToProps, {getUsersProfile, uploadAboutMe, updateStatus, saveAvatar, setAboutMe, addChat }), withAuthReirect, withRouter )(ProfileApiComponent)

export default React.memo(ProfileContainer)