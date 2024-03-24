import React from "react";
import Navbar from './Navbar.tsx';
import { connect } from "react-redux";
import { DataType } from "../../redux/authReducer";
import { RootStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
    data: DataType
}

type PropsType = MapStateToPropsType 

class NavbarApiComponent extends React.PureComponent<PropsType> {

    render(){
        return(
            <>
                {this.props.data && <Navbar userId={this.props.data.id} />}
            </>
        )
    }
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        data: state.authReducer.data
    }
}

const NavbarContainer = connect<MapStateToPropsType, {}, {}, RootStateType>(mapStateToProps, {})(NavbarApiComponent)

export default NavbarContainer