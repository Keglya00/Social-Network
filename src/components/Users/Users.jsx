import styleUsers from './Users.module.css'
import User from "./User/User"
import Paginator from '../Common/Paginator/Paginator'

const Users = (props) => {
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
                {/* <Paginator count={props.portionsCount}> */}
                    <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={props.portionSize} portionsCount={props.portionsCount} pagesCount={props.pagesCount} />
                {/* </Paginator> */}
            </div>
        </div>
    )
}

export default Users