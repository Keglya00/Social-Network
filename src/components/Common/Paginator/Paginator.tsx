import stylePaginator from './Paginator.module.css'
import arrow from '../../../images/arrow.svg'
import { useState } from 'react'
import React from 'react'

type PropsType = {
    pagesCount: number,
    portionSize: number,
    portionsCount: number,
    currentPage: number,
    onPageChanged: (page: number) => void
}

const Paginator: React.FC<PropsType> = (props) => {
    let pages: Array<number> = []
    for(let i=1; i <= props.pagesCount; i++){ 
        pages.push(i)
    }

    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div className={stylePaginator.pages__container}>
            {portionNumber > 1 && <span className={stylePaginator.button} onClick={() => {
                setPortionNumber(portionNumber - 1)
                props.onPageChanged(leftPortionPageNumber - 1)
            }} ><img className={stylePaginator.button_prev} src={arrow} /></span>}
            {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => <span onClick={() => {props.onPageChanged(page)}} className={props.currentPage === page ? stylePaginator.page_active : stylePaginator.page } >{page}</span>)
            }
            {props.portionsCount > portionNumber && <span className={stylePaginator.button} onClick={() => {
                setPortionNumber(portionNumber + 1)
                props.onPageChanged(rightPortionPageNumber + 1)
            }} ><img  className={stylePaginator.button_next} src={arrow} /></span>}
        </div>
    )
}

export default Paginator