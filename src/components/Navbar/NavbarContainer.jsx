import React from "react";
import Navbar from './Navbar';
import { connect } from "react-redux";

class NavbarApiComponent extends React.PureComponent {

    render(){
        return(
            <>
                {this.props.data ? <Navbar userId={this.props.data.id} /> : <Navbar /> }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        data: state.authReducer.data
    }
}

const NavbarContainer = connect(mapStateToProps, {})(NavbarApiComponent)

export default NavbarContainer