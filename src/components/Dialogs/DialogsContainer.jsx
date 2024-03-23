import React from 'react'
import { addMessageActionCreator} from '../../redux/dialogsReducer.ts'
import { connect } from 'react-redux'
import Dialogs from './Dialogs'
import { withAuthReirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux'

let mapStateToProps = (state) => {
    return {
        chatsData: state.dialogsReducer.chatsData,
        messagesData: state.dialogsReducer.messagesData,
        newMessageText: state.dialogsReducer.newMessageText
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        addMessage: (newMessage) => {
            dispatch(addMessageActionCreator(newMessage))
        },
    }
}

const DialogsContainer = compose(connect(mapStateToProps, mapDispatchToProps), withAuthReirect )(Dialogs)

export default DialogsContainer