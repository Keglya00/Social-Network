import { NavLink } from 'react-router-dom'
import headerStyle from './Header.module.css'

const Header = (props) => {
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
                    {props.isAuth ? <button onClick={props.logout}>logout</button> : null }
                </div>
        </header>
    )
}

export default Header