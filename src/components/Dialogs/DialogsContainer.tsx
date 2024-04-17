import React, { ComponentType } from 'react'
import { ChatType, MessageType, StatusType, sendMessage, setChats, setMessages, setCurrentUserId, startWsChannel, stopWsChannel, setCurrentUserData, CurrentUserDataType} from '../../redux/dialogsReducer.ts'
import { connect } from 'react-redux'
import Dialogs from './Dialogs.tsx'
import { withAuthReirect } from '../../hoc/withAuthRedirect.tsx'
import { compose } from 'redux'
import { RootStateType } from '../../redux/redux-store.ts'

type MapStateToPropsType = {
    chatsData: Array<ChatType>,
    messagesData: Array<MessageType>,
    id: number,
    wsStatus: StatusType,
    currentUserId: number,
    currentUserData: CurrentUserDataType
}

type MapDispatchToPropsType = {
    startWsChannel: () => void
    stopWsChannel: () => void
    sendMessage: (userId: number, message: string) => void
    setChats: () => void
    setMessages: (userId: number) => void
    setCurrentUserId: (userId: number) => void
    setCurrentUserData: (userName: string, photo: string) => void
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        chatsData: state.dialogsReducer.chatsData,
        messagesData: state.dialogsReducer.messagesData,
        id: state.authReducer.data.id,
        wsStatus: state.dialogsReducer.wsStatus,
        currentUserId: state.dialogsReducer.currentUserId,
        currentUserData: state.dialogsReducer.currentUserData
    }
}


const DialogsContainer = compose<ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(mapStateToProps, { startWsChannel, stopWsChannel, setCurrentUserData, sendMessage, setChats, setMessages, setCurrentUserId}), withAuthReirect )(Dialogs)

export default DialogsContainer