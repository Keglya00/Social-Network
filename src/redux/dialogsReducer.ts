import { ThunkAction } from 'redux-thunk';
import { RootStateType } from './redux-store';
import { chatApi } from '../ApiWsChat.ts';
import { Dispatch } from 'redux';

const CLEAN_MESSAGES_DATA = 'CLEAN_MESSAGES_DATA'
const ADD_MESSAGES = 'ADD-MESSAGES'
const SET_WS_STATUS = 'SET_WS_STATUS'

type InitialStateType = typeof initialState
export type StatusType = 'pending' | 'ready'
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
    messagesData: [] as Array<MessageType>,
    wsStatus: 'pending' as StatusType
}

const dialogsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch(action.type){
        case CLEAN_MESSAGES_DATA: {
            return{
                ...state,
                messagesData: []
            }
        }
        case ADD_MESSAGES: {
            return {
                ...state,
                messagesData: [...state.messagesData, ...action.newMessages]
            }
        } 
        case SET_WS_STATUS:{
            return {
                ...state,
                wsStatus: action.status
            }
        } 
        default: 
            return state         
    }

}

const newMessageHandler = (dispatch: Dispatch) => (messages: Array<MessageType>) => {
    dispatch(addMessages(messages))
}
const newStatusHandler = (dispatch: Dispatch) => (wsStatus: StatusType) => {
    dispatch(setWsStatus(wsStatus))
}

type ActionType = AddMessagesType | SetWsStatusType | CleanMessagesDataType
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionType>

type CleanMessagesDataType = {type: typeof CLEAN_MESSAGES_DATA}
export const cleanMessagesData = ():CleanMessagesDataType => {return{type: CLEAN_MESSAGES_DATA}}

type AddMessagesType = {type: typeof ADD_MESSAGES, newMessages: MessageType[]}
export const addMessages = (newMessages: MessageType[]): AddMessagesType => {return {type: ADD_MESSAGES, newMessages}}

type SetWsStatusType = {type: typeof SET_WS_STATUS, status: StatusType}
export const setWsStatus = (status: StatusType):SetWsStatusType => {return {type: SET_WS_STATUS, status }}

export const startWsChannel = (): ThunkType => async (dispatch) =>{
    chatApi.start()
    chatApi.subscribe('message-recieved', newMessageHandler(dispatch))
    chatApi.subscribe('wsStatus-changed', newStatusHandler(dispatch))
}
export const stopWsChannel = (): ThunkType => async (dispatch) =>{
    chatApi.unsubscribe('message-recieved', newMessageHandler(dispatch))
    chatApi.unsubscribe('wsStatus-changed', newStatusHandler(dispatch))
    chatApi.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}

export default dialogsReducer