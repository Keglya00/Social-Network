const ADD_MESSAGE = 'ADD-MESSAGE'

type InitialStateType = typeof initialState

export type ChatType = {
    username: string,
    userid: string
}
export type MessageType = {
    message: string,
    id: number,
    isMine: boolean,
}
let initialState = {
    chatsData: [
        {username:'Spirit', userid:'@Spirit'},
        {username:'R3ZAN', userid:'@R3ZAN'}
    ] as Array<ChatType>,
    messagesData: [
        {message:'Hi', id: 1, isMine: true},
        {message:'Hello', id: 2, isMine: false},
        {message:'How are u', id: 2, isMine: true},
        {message:'Great', id: 1, isMine: false},
        {message:'Thanks', id: 3, isMine: true},
        {message:'Thanks', id: 3, isMine: false}
    ] as Array<MessageType>
}

const dialogsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {

    switch(action.type){
        case ADD_MESSAGE:{
            let newMessage = {id: 4, message: action.newMessage, isMine: true}
             return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }
        }       
        default: 
            return state         
    }

}

type AddMessageActionCreatorType = {type: typeof ADD_MESSAGE, newMessage: string}
export const addMessageActionCreator = (newMessage: string): AddMessageActionCreatorType => {return {type: ADD_MESSAGE, newMessage}}

export default dialogsReducer