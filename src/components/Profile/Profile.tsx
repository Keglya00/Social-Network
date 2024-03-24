import styleProfile from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo.tsx'
import MyPostsContainer from './MyPosts/MyPostContainer.tsx'
import React from 'react'
import { ProfileType } from '../../redux/profileReducer'

type PropsType = {
    profile: ProfileType
    isOwner: boolean,
    status: string,
    setUserAboutMe: (aboutMe: string) => void,
    saveAvatar: (avatar: any) => void,
    updateStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {
    return(
    <div className={styleProfile.content}>
        <ProfileInfo photos={props.profile.photos} setUserAboutMe={props.setUserAboutMe} aboutMe={props.profile.aboutMe} saveAvatar={props.saveAvatar} isOwner={props.isOwner} nickName={props.profile.fullName} status={props.status} updateStatus={props.updateStatus}  />
        <MyPostsContainer/>
    </div>
    )
}

export default Profile 