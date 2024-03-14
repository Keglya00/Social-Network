import stylePaginator from './Paginator.module.css'
import { useState } from 'react'

const Paginator = (props) => {
    let pages = []
    for(let i=1; i <= props.pagesCount; i++){ 
        pages.push(i)
    }

    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)} >prev</button>}
            {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => <span onClick={() => {props.onPageChanged(page)}} className={props.currentPage === page ? stylePaginator.page_active : stylePaginator.page } >{page}</span>)
            }
            {props.portionsCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)} >next</button>}
        </div>
    )
}

export default Paginator