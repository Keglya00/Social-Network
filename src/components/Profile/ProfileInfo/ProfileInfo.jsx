import styleProfileInfo from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus'

const ProfileInfo = (props) => {
    return(
    <div className={styleProfileInfo.content__top}>
        <div className={styleProfileInfo.content__top_avatar}>
            <img className={styleProfileInfo.content__top_avatar} src={props.photos.large} /> 
        </div>
        <ul className={styleProfileInfo.content__top_description}>
            <li>{props.nickName}</li>
            <li><ProfileStatus status={props.status} updateStatus={props.updateStatus}  /></li>
        </ul>
    </div> 
    )
}

export default ProfileInfo