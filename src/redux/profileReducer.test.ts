import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer"
import { ProfileType, PostType } from "./profileReducer"

let initialState = {
    postsData: [
        {message:'How are you', id: 1, likes: 10},
        {message:'It is my first post', id: 2, likes: 22},
        {message:'Hello world', id: 3, likes: 228}
    ] as Array<PostType> ,
    profile: {} as ProfileType, 
    isFetching: false,
    status: ''
}

type InitialStateType = typeof initialState

it('new post should be added', () => {
    let action = addPostActionCreator('test message')
    let state: InitialStateType = initialState
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(4)
})

it('post should be deleted', () => {
    let action = deletePost(1)
    let state = initialState
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(2)
})