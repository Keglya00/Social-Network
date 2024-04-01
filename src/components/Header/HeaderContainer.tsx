import { connect } from "react-redux";
import Header from "./Header.tsx";
import React, { useEffect } from "react";
import { setUsersAvatarThunkCreator, logoutThunkCreator, DataType } from '../../redux/authReducer.ts';
import { ProfileType } from "../../redux/profileReducer.ts";
import { RootStateType } from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    userAuthData: DataType,
    userAvatar: string,
    isAuth: boolean,
    isFetching: boolean,
    profile: ProfileType   
}

type MapDispatchToPropsType = {
    setUsersAvatarThunkCreator: (id: number) => void,
    logoutThunkCreator: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const HeaderApiComponent: React.FC<PropsType> = (props) => {

    useEffect(() => {
        userAuthorized()
    }, [])

    useEffect(() => {
        userAuthorized()
    }, [props.profile])

    let userAuthorized = () => {
        props.setUsersAvatarThunkCreator(props.userAuthData.id)
    }


    return (
         <>
            <Header logout={props.logoutThunkCreator} login={props.userAuthData.login} userAvatar={props.userAvatar} isAuth={props.isAuth} userAuthorized={userAuthorized} /> 
        </>
    )

}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return{
        userAuthData: state.authReducer.data,
        userAvatar: state.authReducer.userAvatar,
        isAuth: state.authReducer.isAuth,
        isFetching: state.authReducer.isFetching,
        profile: state.profileReducer.profile
    }
}

const HeaderContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(mapStateToProps, { setUsersAvatarThunkCreator, logoutThunkCreator})(HeaderApiComponent)

export default HeaderContainer