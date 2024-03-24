import { NavLink } from 'react-router-dom'
import headerStyle from './Header.module.css'
import React from 'react'

type PropsType = {
    login: string,
    userAvatar: string,
    isAuth: boolean,
    userAuthorized: () => void,
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return(
        <header className={headerStyle.header}>
            <div className={headerStyle.header__top}>
                <div className={headerStyle.header__top_logo}>
                    <img src='' />
                    Logo
                </div>
                <div className={headerStyle.header__top_name}>
                    ABSHCHKHDA Social Network
                </div>
            </div>
                <div className={headerStyle.header__login}>
                    {props.isAuth ? null : <NavLink to='/login' className={headerStyle.header__login}>Login</NavLink> }
                    {props.isAuth && props.userAvatar ? <img src={props.userAvatar} className={headerStyle.header__login_avatar} /> : null }
                    {props.isAuth ? props.login : null}
                    {props.isAuth ? <div className={headerStyle.header__login} onClick={props.logout}>Logout</div> : null }
                </div>
        </header>
    )
}

export default Header