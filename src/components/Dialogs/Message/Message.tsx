import styleMessage from './Message.module.css'
import React from 'react'

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (messagesData) => {
    return(
        <div  className={styleMessage.message}>
            {messagesData.message}
        </div>       
    )
} 

export default Message