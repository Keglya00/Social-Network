import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootStateType } from "../redux/redux-store"

let mapStateToPropsForRedirect = (state: RootStateType) => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

type WithAuthReirectPropsType = {
    isAuth: boolean
}

export function withAuthReirect<T extends WithAuthReirectPropsType> (Component: React.ComponentType<T>) {

    class RedirectComponent extends React.Component<WithAuthReirectPropsType> {
        render() {
            if(!this.props.isAuth) return <Navigate to='/login' />
            return <Component {...this.props as T} />
        }
    }

    let ConnectedRedirectComponent = connect<WithAuthReirectPropsType, {}, {}, RootStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedRedirectComponent

}
