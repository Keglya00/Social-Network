import { connect } from "react-redux";
import Header from "./Header.tsx";
import React from "react";
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

class HeaderApiComponent extends React.PureComponent<PropsType> {

    componentDidMount(){
        this.userAuthorized()       
    }

    componentDidUpdate(prevProps: PropsType) {
        if(this.props.profile != prevProps.profile){
            this.userAuthorized()
        }        
    }

    userAuthorized = () => {
        this.props.setUsersAvatarThunkCreator(this.props.userAuthData.id)
    }

    render() {
        return (
            <>
                <Header logout={this.props.logoutThunkCreator} login={this.props.userAuthData.login} userAvatar={this.props.userAvatar} isAuth={this.props.isAuth} userAuthorized={this.userAuthorized} /> 
            </>
        )
    }
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