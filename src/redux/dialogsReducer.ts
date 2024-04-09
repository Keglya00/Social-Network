import { ThunkAction } from 'redux-thunk';
import { RootStateType } from './redux-store';
import { chatApi } from '../ApiWsChat.ts';
import { Dispatch } from 'redux';

const ADD_MESSAGE = 'ADD-MESSAGE'

type InitialStateType = typeof initialState

export type ChatType = {
    username: string,
    userid: string
}
export type MessageType = {
    message: string,
    userId: number,
    photo: string,
    userName: string
}
let initialState = {
    chatsData: [
        {username:'Spirit', userid:'@Spirit'},
        {username:'R3ZAN', userid:'@R3ZAN'}
    ] as Array<ChatType>,
    messagesData: [] as Array<MessageType>
}

const dialogsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch(action.type){
        case ADD_MESSAGE:{
             return {
                ...state,
                messagesData: [...state.messagesData, action.newMessage]
            }
        }       
        default: 
            return state         
    }

}

const newMessageHandler = (dispatch: Dispatch) => (messages: Array<MessageType>) => {
    messages.forEach(message => dispatch(addMessage(message)))
}

type ActionType = AddMessage
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionType>

type AddMessage = {type: typeof ADD_MESSAGE, newMessage: MessageType}
export const addMessage = (newMessage: MessageType): AddMessage => {return {type: ADD_MESSAGE, newMessage}}
export const startWsChannel = (): ThunkType => async (dispatch) =>{
    chatApi.start()
    chatApi.subscribe(newMessageHandler(dispatch))
}
export const stopWsChannel = (): ThunkType => async (dispatch) =>{
    chatApi.unsubscribe(newMessageHandler(dispatch))
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}

export default dialogsReducer