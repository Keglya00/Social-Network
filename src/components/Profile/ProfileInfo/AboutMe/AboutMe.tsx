import { useState, useEffect } from 'react'
import editButton from '../../../../images/editButton.png'
import styleAboutMe from './AboutMe.module.scss'
import checkButton from '../../../../images/checkmark.svg'
import bioIcon from '../../../../images/bio.svg'
import React from 'react'

type PropsType = {
    aboutMe: string,
    isOwner: boolean,
    setUserAboutMe: (aboutMe: string) => void
}

const AboutMe: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [aboutMe, setAboutme] = useState(props.aboutMe)

    useEffect(() => {
        setAboutme(props.aboutMe)
    },
        [props.aboutMe]
    )

    let activateEditMode = () => {
        setEditMode(true)
    }

    let deactivateEditMode = () => {
        setEditMode(false)
        props.setUserAboutMe(aboutMe)
    }

    let onAboutMeChanged = (aboutMe: any) => {
        if(aboutMe.currentTarget.value.length < 70) {
            setAboutme(aboutMe.currentTarget.value)
        }
    }

    return (
        <div className={styleAboutMe.aboutMe}>
            <div><img className={styleAboutMe.aboutMe__icon} src={bioIcon} /></div>
            <div className={styleAboutMe.aboutMe__text}>
                {editMode 
                ? <div>
                    <textarea onChange={onAboutMeChanged} value={aboutMe} placeholder={'only 70 symbols are avalable'} className={styleAboutMe.aboutMe__textarea} />
                    <span onClick={deactivateEditMode} ><img className={styleAboutMe.aboutMe__button_check} src={checkButton} /></span>
                </div>
                : <div className={styleAboutMe.aboutMe__field}>
                    <div className={styleAboutMe.aboutMe__field_text}>{props.aboutMe || 'No bio'}</div>
                    {props.isOwner && <span className={styleAboutMe.aboutMe__field_button} onClick={activateEditMode}><img src={editButton} /></span>}
                </div>
                }
                <div className={styleAboutMe.aboutMe__sign}>bio</div>
            </div>
        </div>
    )
}

export default AboutMe