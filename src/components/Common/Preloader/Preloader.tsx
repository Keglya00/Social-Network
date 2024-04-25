import preloader from './../../../preloader.gif'
import stylePreloader from './Preloader.module.scss'
import React from 'react'

const Preloader = () => {
    return(
        <div>
            <img className={stylePreloader.preloader} src={preloader}/>
        </div>
    )
}

export default Preloader