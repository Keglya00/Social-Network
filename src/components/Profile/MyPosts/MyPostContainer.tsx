import React from 'react'
import MyPosts from './MyPosts.tsx'
import { PostType, addPostActionCreator} from '../../../redux/profileReducer.ts'
import { connect } from 'react-redux'
import { RootStateType } from '../../../redux/redux-store.ts'

type MapStateToPropsType = {
    postsData: Array<PostType>
}

type MapDispatchToPropsType = {
    addPost: (newPost: string) => void
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        postsData: state.profileReducer.postsData
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPost: string) => {
            dispatch(addPostActionCreator(newPost))
        }
    }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer