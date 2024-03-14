import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"

let renderEntireTree = () => {}

let store = {
    state: {
        profilePage: {
            postsData: [
                {message:'How are you', id: 1, likes: 10},
                {message:'It is my first post', id: 2, likes: 22},
                {message:'Ya lublu mefedron)', id: 3, likes: 228}
            ],

            newPostText: ''
        },
    
        dialogsPage: {
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
            ],
    
            newMessageText: ''
        }
    },

    getState() {
        return this.state
    },
    
    renderAllTree(observer) {
        renderEntireTree = observer
    },

    dispatch(action) {
        this.state.profilePage = profileReducer(this.state.profilePage, action)
        this.state.dialogsPage = dialogsReducer(this.state.dialogsPage, action)
        renderEntireTree(this.state)
    }
}

  export default store

  