import styleMessage from './Message.module.scss'
import React from 'react'

type PropsType = {
    message: string
}

const MyMessage: React.FC<PropsType> = (messagesData) => {
    return(
        <div  className={styleMessage.mymessage__inner}>
            {messagesData.message}
        </div>       
    )
}

export default MyMessage