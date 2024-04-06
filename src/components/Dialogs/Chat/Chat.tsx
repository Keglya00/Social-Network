import styleChat from './Chat.module.scss'
import { NavLink } from 'react-router-dom'
import React from 'react'

type PropsType = {
    username: string,
    userid: string
}

const Chat: React.FC<PropsType> = (chatsData) => {
    return(
        <NavLink to={`${'/dialogs/'}${chatsData.userid}`} className={styleChat.chat}>
            {chatsData.username}
        </NavLink>
    )
}

export default Chat