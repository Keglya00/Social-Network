import styleMessage from './Message.module.scss'
import React from 'react'

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return(
        <div className={styleMessage.message}>
            <div className={styleMessage.message__inner}>
                {props.message}
            </div>
        </div>     
    )
} 

export default Message