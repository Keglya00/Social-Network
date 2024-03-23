import React from 'react'
import MyPosts from './MyPosts'
import { addPostActionCreator} from '../../../redux/profileReducer.ts'
import { connect } from 'react-redux'

let mapStateToProps = (state) => {
    return {
        postsData: state.profileReducer.postsData,
        newPostText: state.profileReducer.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => {
            dispatch(addPostActionCreator(newPost))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer