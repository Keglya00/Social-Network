import stylePost from './Post.module.scss'
import React from 'react'

type PorpsType = {
    message: string,
    likes: number
}

const Post: React.FC<PorpsType> = (message) => {
    return(
        <div className={stylePost.post}>
            <div className={stylePost.post__title}>
                <img className={stylePost.post__title_avatar} src='https://i.pinimg.com/1200x/aa/08/89/aa0889d270f9ebfeb6600015bf64f2b2.jpg' />
                <div className={stylePost.post__title_nickname}>
                    Nickname
                </div>
            </div>
            <div className={stylePost.post__message}>
                {message.message}
            </div>
            <div className={stylePost.post__likes}>
                <img className={stylePost.post__likes_icon} src='https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/like-icon.png' />
                <div className={stylePost.post__likes_count}>
                    {message.likes}
                </div>
            </div>
        </div>
    )
}

export default Post