import React from 'react'
import styleDialogs from './Dialogs.module.css'
import Chat from './Chat/Chat'
import Message from './Message/Message'
import MyMessage from './Message/MyMessage'
import { Field, Form } from 'react-final-form'
import { required } from '../../utilits/validators'

const Dialogs = (props) => {

    let onAddMessageClick = (newMessage) => {
        props.addMessage(newMessage)
    }

    let chatsElements = props.chatsData.map((chat) => <li><Chat username={chat.username} userid={chat.userid}/></li>)

    let messagesElements = props.messagesData.map((message) => 
        message.isMine===true ? <div className={styleDialogs.mymessage}><MyMessage message={message.message}/></div> :<Message message={message.message}/>
    )

    return(
        <div className={styleDialogs.dialogs}>
            <ul className={styleDialogs.dialogs__chats}>
                {chatsElements}
            </ul>
            <div className={styleDialogs.dialogs__messages}>
                {messagesElements}
                <AddMessageForm addMessage={onAddMessageClick} />
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <Form onSubmit={(formData) => {props.addMessage(formData.newMessageBody)}}>
            {( { handleSubmit, form} ) => (
                <form onSubmit={handleSubmit} className={styleDialogs.dialogs__messages_addMessage}>
                    <Field validate={required} placeholder='Enter your message' component={'textarea'} name={'newMessageBody'} className={styleDialogs.dialogs__addMessages_textarea}></Field>
                    <button onClick={() => {
                        handleSubmit()
                        form.reset()
                    }} className={styleDialogs.dialogs__addMessages_button}></button>
                </form>
            )}
        </Form>   
    )
}

export default Dialogs