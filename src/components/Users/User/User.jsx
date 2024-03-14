import { NavLink } from 'react-router-dom'
import styleUser from './User.module.css'

 const User = (props) => {
    return(
        <div className={styleUser.user}>
            <NavLink to={'/profile/' + props.id}>
                {props.avatar === null ? <div className={styleUser.user__noavatar}>ava</div> : <img className={styleUser.user__avatar} src={props.avatar} /> }
            </NavLink>
            <div className={styleUser.user__description}>
                <div className={styleUser.user__description_name}>
                    {props.name}
                </div>
                <div className={styleUser.user__description_status}>
                    {props.status === null ? <div>No status</div> : props.status}
                </div>
            </div>  
        </div>
    )
 }

 export default User