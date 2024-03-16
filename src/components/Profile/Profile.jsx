import styleProfile from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostContainer'

const Profile = (props) => {
    return(
    <div className={styleProfile.content}>
        <ProfileInfo photos={props.profile.photos} setUserAboutMe={props.setUserAboutMe} aboutMe={props.profile.aboutMe} saveAvatar={props.saveAvatar} isOwner={props.isOwner} nickName={props.profile.fullName} status={props.status} updateStatus={props.updateStatus}  />
        <MyPostsContainer/>
    </div>
    )
}

export default Profile 