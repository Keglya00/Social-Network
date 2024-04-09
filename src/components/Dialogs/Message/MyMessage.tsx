import styleMessage from './Message.module.scss'
import React from 'react'

type PropsType = {
    message: string
}

const MyMessage: React.FC<PropsType> = (props) => {
    return(
        <div  className={styleMessage.mymessage__inner}>
            {props.message}
        </div>       
    )
}

export default MyMessage