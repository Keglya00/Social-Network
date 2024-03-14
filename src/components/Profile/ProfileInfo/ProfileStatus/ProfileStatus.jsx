import React, {useEffect, useState} from "react"

const ProfileStatus = (props) => {

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

    let onStatusChange = (status) => {
        setStatus(status.currentTarget.value)
    }

    return(
        <div>
            {editMode
            ? <div><input onBlur={deactivateEditMode} onChange={onStatusChange} autoFocus={true} value={status} /></div> 
            : <div onDoubleClick={activateEditMode}>{status || 'No status'}</div>}
        </div>
    )
}

export default ProfileStatus