import React from 'react'
import PropTypes from 'prop-types'

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func
}

Pagination.defaultProps = {
    onPageChange: null
}

function Pagination(props) {
    const {pagination, onPageChange} = props
    const {page, limit, totalRows, totalPages} = pagination

    // const totalPages = Math.ceil(totalRows / limit)

    console.log(pagination)

    function handlePageChange(newPage) {
        if(onPageChange) {
            onPageChange(newPage)
        }
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++){
        pages.push(i)
    }

    const renderPageNumber = pages.map(number => {
        if (number == page)
            return (         
            <li className="page-item active" key = {number}>
                <button className="page-link"  id = {number} onClick = {() => handlePageChange(number)}>{number}</button>
            </li>
            )
        else  
        return (      
            <li className="page-item" key = {number} >
                <button className="page-link"  id = {number} onClick = {() => handlePageChange(number)}>{number}</button>
            </li>
            )        
    })

    return (
        <div>
            <nav aria-label="..." >
                <ul className="pagination">
                    <li className={(page <= 1) ? "page-item disabled" : "page-item"}>
                        <button className="page-link" tabIndex="-1"
                            disabled={page <= 1} 
                            onClick={() => handlePageChange(page - 1)}
                        >Previous</button>
                    </li>
                    {renderPageNumber}
                    <li className= {(page >= totalPages) ? "page-item disabled" : "page-item"}>
                        <button className="page-link"  
                            disabled={page >= totalPages} 
                            onClick={() => handlePageChange(page + 1)}
                        >Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Pagination