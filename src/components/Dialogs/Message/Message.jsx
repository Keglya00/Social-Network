import styleMessage from './Message.module.css'

const Message = (messagesData) => {
    return(
        <div  className={styleMessage.message}>
            {messagesData.message}
        </div>       
    )
} 

export default Message