import React, {useEffect, useState} from "react"
import styleStatus from './ProfileStatus.module.scss'
import statusIcon from '../../../../images/statusIcon.png'

type PropsType = {
    status: string,
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },
        [props.status]
    )

    let activateEditMode = () => {
        setEditMode(true)
    }

    let deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    let onStatusChange = (status: any) => {
        setStatus(status.currentTarget.value)
    }

    return(
        <div className={styleStatus.status}>
            <div><img className={styleStatus.status__icon} src={statusIcon} /></div>
            <div className={styleStatus.status__text}>
                {editMode
                ? <div><input className={styleStatus.status__text_input} onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={status} /></div> 
                : <div className={styleStatus.status__text_name} onDoubleClick={activateEditMode}>{status || 'No status'}</div>}
                <div className={styleStatus.status__text_sign}>status</div>
            </div>
        </div>
    )
}

export default ProfileStatus