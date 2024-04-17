import styleProfileInfo from './ProfileInfo.module.scss'
import ProfileStatus from './ProfileStatus/ProfileStatus.tsx'
import emptyAvatar from '../../../emptyAvatar.jpg'
import addButton from '../../../images/addButton.png'
import usernameIcon from '../../../images/userNameIcon.png'
import messageIcon from '../../../images/message-icon.png'
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
    updateStatus: (status: string) => void,
    onAddChat: () => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    let onAvatarSelected = (value: any) => {
        if(value.target.files.length) {
            props.saveAvatar(value.target.files[0])
        }
    }

    return(
    <div className={styleProfileInfo.content__top}>
        <div className={styleProfileInfo.content__top_inner}>
            <div className={styleProfileInfo.content__top_avatar}>
                <div className={styleProfileInfo.avatar__photo_container}>
                    <img className={styleProfileInfo.content__avatar_photo} src={props.photos.large || emptyAvatar} />
                </div>
                {props.isOwner
                ? <div className={styleProfileInfo.content__avatar_container}><img className={styleProfileInfo.content__avatar_button} src={addButton} /><input className={styleProfileInfo.content__avatar_input} onClick={onAvatarSelected} type={'file'} /></div>
                : <div onClick={props.onAddChat} className={styleProfileInfo.content__avatar_container}><img className={styleProfileInfo.content__avatar_button} src={messageIcon} /></div>
                }
            </div>
            <ul className={styleProfileInfo.content__top_description}>
                <li className={styleProfileInfo.content__description_item}>
                    <div><img className={styleProfileInfo.description__item_icon} src={usernameIcon} /></div>
                    <div className={styleProfileInfo.description__item_text}>
                        <div className={styleProfileInfo.item__text_name}>{props.nickName}</div>
                        <div className={styleProfileInfo.item__text_sign}>username</div>
                    </div>
                </li>
                <li> 
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}  />
                </li>
                <li>
                <AboutMe aboutMe={props.aboutMe} isOwner={props.isOwner} setUserAboutMe={props.setUserAboutMe} />
                </li>
            </ul>
        </div>
    </div> 
    )
}

export default ProfileInfo