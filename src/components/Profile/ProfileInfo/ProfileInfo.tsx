import styleProfileInfo from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus.tsx'
import emptyAvatar from '../../../emptyAvatar.png'
import addButton from '../../../images/addButton.jpg'
import AboutMe from './AboutMe/AboutMe.tsx'
import React from 'react'
import { PhotosType } from '../../../redux/profileReducer'

type PropsType = {
    photos: PhotosType,
    aboutMe: string,
    nickName: string,  
    isOwner: boolean,
    status: string,
    setUserAboutMe: (aboutMe: string) => void,
    saveAvatar: (avatar: any) => void,
    updateStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    let onAvatarSelected = (value: any) => {
        if(value.target.files.length) {
            props.saveAvatar(value.target.files[0])
        }
    }

    return(
    <div className={styleProfileInfo.content__top}>
        <div className={styleProfileInfo.content__top_avatar}>
            <img className={styleProfileInfo.content__top_avatar} src={props.photos.large || emptyAvatar} />
            {props.isOwner && <div className={styleProfileInfo.content__avatar_container}><img  className={styleProfileInfo.content__avatar_button} src={addButton} /><input className={styleProfileInfo.content__avatar_input} onClick={onAvatarSelected} type={'file'} /></div>}
        </div>
        <ul className={styleProfileInfo.content__top_description}>
            <li>{props.nickName}</li>
            <li><ProfileStatus status={props.status} updateStatus={props.updateStatus}  /></li>
            <li>
                <AboutMe aboutMe={props.aboutMe} isOwner={props.isOwner} setUserAboutMe={props.setUserAboutMe} />
            </li>
        </ul>
    </div> 
    )
}

export default ProfileInfo