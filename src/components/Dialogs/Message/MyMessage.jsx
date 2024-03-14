import styleMessage from './Message.module.css'

const MyMessage = (messagesData) => {
    return(
        <div  className={styleMessage.mymessage__inner}>
            {messagesData.message}
        </div>       
    )
}

export default MyMessage