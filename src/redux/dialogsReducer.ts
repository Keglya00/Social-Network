import { ThunkAction } from 'redux-thunk';
import { RootStateType } from './redux-store';
import { chatApi } from '../ApiWsChat.ts';
import { Dispatch } from 'redux';
import { addChatWithUser, getListOfMessages, getUserChats, sendMessageToUser } from '../API.ts';
import { PhotosType } from './profileReducer.ts';

const CLEAN_MESSAGES_DATA = 'CLEAN_MESSAGES_DATA'
const ADD_MESSAGES = 'ADD-MESSAGES'
const SET_WS_STATUS = 'SET_WS_STATUS'
const ADD_USER_CHATS = 'ADD_USER_CHATS'
const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID'
const SET_CURRENT_USER_DATA = 'SET_CURRENT_USER_DATA'

type InitialStateType = typeof initialState
export type StatusType = 'pending' | 'ready'
export type ChatType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
    userName: string
}
export type CurrentUserDataType = {
    photo: string,
    userName: string
}
export type MessageType = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null | string
    viewed: boolean
}
let initialState = {
    chatsData: [] as Array<ChatType>,
    messagesData: [] as Array<MessageType>,
    wsStatus: 'pending' as StatusType,
    currentUserId: 0,
    currentUserData: {} as CurrentUserDataType
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
                messagesData: [...action.newMessages]
            }
        } 
        case SET_WS_STATUS:{
            return {
                ...state,
                wsStatus: action.status
            }
        }
        case ADD_USER_CHATS: {
            return {
                ...state, 
                chatsData: action.chats 
            }
        }
        case SET_CURRENT_USER_ID: {
            return {
                ...state,
                currentUserId: action.userId
            }
        }
        case SET_CURRENT_USER_DATA: {
            return {
                ...state,
                currentUserData: action.data
            }
        }
        default: 
            return state         
    }
   
}

const newMessageHandler = (dispatch: Dispatch) => (currentId: number) => {
    debugger
    dispatch(setMessages(currentId))
}
const newStatusHandler = (dispatch: Dispatch) => (wsStatus: StatusType) => {
    dispatch(setWsStatus(wsStatus))
}

type ActionType = AddMessagesType | SetWsStatusType | CleanMessagesDataType | AddUserChatsType | SetCurrentUserIdType | SetCurrentUserDataType
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionType>

type CleanMessagesDataType = {type: typeof CLEAN_MESSAGES_DATA}
export const cleanMessagesData = ():CleanMessagesDataType => {return{type: CLEAN_MESSAGES_DATA}}

type AddMessagesType = {type: typeof ADD_MESSAGES, newMessages: MessageType[]}
export const addMessages = (newMessages: MessageType[]): AddMessagesType => {return {type: ADD_MESSAGES, newMessages}}

type SetWsStatusType = {type: typeof SET_WS_STATUS, status: StatusType}
export const setWsStatus = (status: StatusType):SetWsStatusType => {return {type: SET_WS_STATUS, status }}

type AddUserChatsType = {type: typeof ADD_USER_CHATS, chats: Array<ChatType>}
export const addUserChats = (chats: Array<ChatType>): AddUserChatsType => {return{type: ADD_USER_CHATS ,chats}}

type SetCurrentUserIdType = {type: typeof SET_CURRENT_USER_ID, userId: number}
export const setCurrentUserId = (userId: number): SetCurrentUserIdType => {return{type: SET_CURRENT_USER_ID, userId}}

type SetCurrentUserDataType = {type: typeof SET_CURRENT_USER_DATA, data: CurrentUserDataType}
export const setCurrentUserData = (userName: string, photo: string): SetCurrentUserDataType => {return{type: SET_CURRENT_USER_DATA, data: {photo, userName}}}

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
export const sendMessage = (userId:number, message: string): ThunkType => async (dispatch) => {
    debugger
    chatApi.sendMessage(message)
    sendMessageToUser(userId, message)
}
export const addChat = (userId: number): ThunkType => async (dispatch) => {
    addChatWithUser(userId)
}
export const setChats = (): ThunkType => async (dispatch) => {
    let data = await getUserChats()
    dispatch(addUserChats(data))
}
export const setMessages = (userId: number): ThunkType => async (dispatch) => {
    let data = await getListOfMessages(userId)
    dispatch(addMessages(data.items))
}

export default dialogsReducer