import React from 'react'
import styleMyPosts from './MyPosts.module.css'
import Post from './Posts/Post.tsx'
import { Form, Field } from 'react-final-form'
import { required } from '../../../utilits/validators.ts'
import { PostType } from '../../../redux/profileReducer'

type PropsType = {
    postsData: Array<PostType>,
    addPost: (newPost: string) => void
}
type PropsFormType = {
    addPost: (newPost: string) => void       
}

const MyPosts: React.FC<PropsType> = (props) => {
    
    let postsElements = props.postsData.map( (post) => <Post message={post.message} likes={post.likes} /> )

    let onAddPostClick = (newPost: string) => {
        props.addPost(newPost)
    }

    return(
        <div className={styleMyPosts.MyPosts}>
            <div className={styleMyPosts.MyPosts__title}>
                My posts
            </div>
            <AddNewPostForm addPost={onAddPostClick} />
            <div>
                {postsElements}
            </div>
        </div>
    )
}

const AddNewPostForm: React.FC<PropsFormType> = (props) => {
    return (
        <Form onSubmit={(formData) => {props.addPost(formData.newPostBody)}}>
        {({ handleSubmit, form} ) => (
        <form onSubmit={handleSubmit} className={styleMyPosts.MyPosts__addPost}>
            <Field validate={required} placeholder='Enter your post' component={'textarea'} name={'newPostBody'} className={styleMyPosts.MyPosts__addPost_textarea}></Field>
            <button onClick={() => {
                handleSubmit()
                form.reset()
            }} className={styleMyPosts.MyPosts__addPost_button}>
                Add post
            </button>
        </form>
        )}
    </Form>
    )
}

export default MyPosts