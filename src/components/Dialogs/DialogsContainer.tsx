import React from 'react'
import { ChatType, MessageType, addMessageActionCreator} from '../../redux/dialogsReducer.ts'
import { MapDispatchToProps, connect } from 'react-redux'
import Dialogs from './Dialogs.tsx'
import { withAuthReirect } from '../../hoc/withAuthRedirect.tsx'
import { compose } from 'redux'
import { RootStateType } from '../../redux/redux-store.ts'

type MapStateToPropsType = {
    chatsData: Array<ChatType>,
    messagesData: Array<MessageType>
}

type MapDispatchToPropsType = {
    addMessage: (newMessage: string) => void
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        chatsData: state.dialogsReducer.chatsData,
        messagesData: state.dialogsReducer.messagesData
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return{
        addMessage: (newMessage: string) => {
            dispatch(addMessageActionCreator(newMessage))
        },
    }
}

const DialogsContainer = compose(connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(mapStateToProps, mapDispatchToProps), withAuthReirect )(Dialogs)

export default DialogsContainer