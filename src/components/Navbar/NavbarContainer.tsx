import React from "react";
import Navbar from './Navbar.tsx';
import { connect } from "react-redux";
import { DataType } from "../../redux/authReducer";
import { RootStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
    data: DataType
}

type PropsType = MapStateToPropsType 

const NavbarApiComponent: React.FC<PropsType> = (props) => {
    return(
        <>
            {props.data && <Navbar userId={props.data.id} />}
        </>
    )

}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        data: state.authReducer.data
    }
}

const NavbarContainer = connect<MapStateToPropsType, {}, {}, RootStateType>(mapStateToProps, {})(NavbarApiComponent)

export default React.memo(NavbarContainer)