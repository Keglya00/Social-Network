import styleMessage from './Message.module.scss'
import React from 'react'

type PropsType = {
    message: string,
    userName: string
}

const Message: React.FC<PropsType> = (props) => {
    return(
        <div className={styleMessage.message}>
            <img className={styleMessage.message__photo} />
            <div className={styleMessage.message__inner}>
                <div className={styleMessage.message__name}>{props.userName}</div>
                {props.message}
            </div>
        </div>     
    )
} 

export default Message