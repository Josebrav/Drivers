import style from '../Pagination/Pagination.module.css';

const Pagination = ({ driversPerPage, totalDrivers, currentPage, setCurrentPage }) => {
    const pageNumbers = Math.ceil(totalDrivers / driversPerPage);
    const pagesToShow = 5; 

    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage > pageNumbers) {
        endPage = pageNumbers;
        startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const displayPageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className={style.paginationContainer}>
            <nav>
                <ul className={style.pagination}>
                    <li className={style.pageItem}>
                        <a
                            onClick={() => {
                                setCurrentPage(currentPage - 1);}}
                            href="#"
                            className={style.pageLink}
                        >
                            Previous
                        </a>
                    </li>
                    <div className={style.paginationSubset}>
                        {displayPageNumbers.map((number) => (
                            <li key={number} className={style.pageItem}>
                                <div className={style.pageContainer}>
                                    <a
                                        onClick={() => setCurrentPage(number)}
                                        href="#"
                                        className={number === currentPage ? style.active : style.pageLink}
                                    >
                                        {number}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </div>
                    <li className={style.pageItem}>
                        <a
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                            }}
                            href="#"
                            className={style.pageLink}
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;