import styleUsers from './Users.module.css'
import User from "./User/User.tsx"
import Paginator from '../Common/Paginator/Paginator.tsx'
import React from 'react'
import { UsersDataType } from '../../redux/usersReducer.ts'

type PropsType = {
    pagesCount: number,
    currentPage: number,
    usersData: Array<UsersDataType>,
    onUserFollow: (userId: number) => void,
    onUserUnfollow: (userId: number) => void,
    onPageChanged: (page: number) => void,
    isFetching: boolean,
    followingInProgress: Array<number>,
    portionsCount: number,
    portionSize: number
}

const Users: React.FC<PropsType> = (props) => {
    let usersElements = props.usersData.map(
            (user) => 
            <li className={styleUsers.users__item}>
                <User key={user.id} id={user.id} name={user.name} status={user.status} avatar={user.photos.small} />
                {user.followed 
                ? <button className={styleUsers.users__button} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.onUserUnfollow(user.id)}} >unfollow</button> 
                : <button className={styleUsers.users__button} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.onUserFollow(user.id)}} >follow</button>
                }
            </li>
        
        )

    return(
        <div>
            <div className={styleUsers.users}>
                {usersElements}
            </div>
            <div>
                <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={props.portionSize} portionsCount={props.portionsCount} pagesCount={props.pagesCount} />
            </div>
        </div>
    )
}

export default Users