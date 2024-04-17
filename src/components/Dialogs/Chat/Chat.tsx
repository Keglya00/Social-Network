import styleChat from './Chat.module.scss'
import noAvatar from '../../../emptyAvatar.jpg'
import { NavLink } from 'react-router-dom'
import React from 'react'

type PropsType = {
    username: string,
    photo: string
}

const Chat: React.FC<PropsType> = (props) => {
    return(
        <div className={styleChat.chat}>
            <div>
                <img className={styleChat.chat__photo} src={props.photo || noAvatar}/>
            </div>
            <div className={styleChat.chat__username}>
                {props.username}
            </div>
        </div>
    )
}

export default Chat