import React, { ComponentType } from 'react'
import { ChatType, MessageType, addMessage, sendMessage, startWsChannel, stopWsChannel} from '../../redux/dialogsReducer.ts'
import { MapDispatchToProps, connect } from 'react-redux'
import Dialogs from './Dialogs.tsx'
import { withAuthReirect } from '../../hoc/withAuthRedirect.tsx'
import { compose } from 'redux'
import { RootStateType } from '../../redux/redux-store.ts'

type MapStateToPropsType = {
    chatsData: Array<ChatType>,
    messagesData: Array<MessageType>,
    id: number
}

type MapDispatchToPropsType = {
    addMessage: (newMessage: MessageType) => void
    startWsChannel: () => void
    stopWsChannel: () => void
    sendMessage: (message: string) => void
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        chatsData: state.dialogsReducer.chatsData,
        messagesData: state.dialogsReducer.messagesData,
        id: state.authReducer.data.id
    }
}


const DialogsContainer = compose<ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(mapStateToProps, {addMessage, startWsChannel, stopWsChannel, sendMessage}), withAuthReirect )(Dialogs)

export default DialogsContainer