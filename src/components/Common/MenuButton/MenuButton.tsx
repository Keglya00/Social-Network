import React from "react";
import { NavLink } from "react-router-dom";
import menuButton from '../../../images/menu.png'
import styleMenu from './MenuButton.module.scss'

const MenuButton = () => {
    return(
        <div>
            <NavLink to={'/navbar?device=mobile'} className={styleMenu.content__menu}><img className={styleMenu.content__menu_img} src={menuButton} /></NavLink>
        </div>
    )
}

export default MenuButton