const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = {
    chatsData: [
        {username:'Spirit', userid:'@Spirit'},
        {username:'R3ZAN', userid:'@R3ZAN'}
    ],

    messagesData: [
        {message:'Mefedronnnn', id: 1, isMine: true},
        {message:'Geroinnnnnn', id: 2, isMine: false},
        {message:'Geroinnnnnn', id: 2, isMine: true},
        {message:'Mefedronnnn', id: 1, isMine: false},
        {message:'Alchohollll', id: 3, isMine: true},
        {message:'Alchohollll', id: 3, isMine: false}
    ]
}

const dialogsReducer = (state = initialState, action) => {

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

export const addMessageActionCreator = (newMessage) => {return {type: ADD_MESSAGE, newMessage}}

export default dialogsReducer