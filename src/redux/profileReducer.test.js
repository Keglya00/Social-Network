import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer"

let initialState = {
    postsData: [
        {message:'How are you', id: 1, likes: 10},
        {message:'It is my first post', id: 2, likes: 22},
        {message:'Ya lublu mefedron)', id: 3, likes: 228}
    ]
}

it('new post should be added', () => {
    let action = addPostActionCreator('test message')
    let state = initialState
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(4)
})

it('post should be deleted', () => {
    let action = deletePost(1)
    let state = initialState
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(2)
})