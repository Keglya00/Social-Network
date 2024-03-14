import styleChat from './Chat.module.css'
import { NavLink } from 'react-router-dom'

const Chat = (chatsData) => {
    return(
        <NavLink to={`${'/dialogs/'}${chatsData.userid}`} className={styleChat.chat}>
            {chatsData.username}
        </NavLink>
    )
}

export default Chat