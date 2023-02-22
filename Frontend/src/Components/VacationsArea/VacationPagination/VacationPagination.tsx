import "./VacationPagination.css";

import Pagination from '@mui/material/Pagination';

interface VacationPaginationProps {
    totalPosts: number
    postsPerPage: number
    setCurrentPage: any
    currentPage: number
}

function VacationPagination(props: VacationPaginationProps): JSX.Element {

    let pages = [];

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pages.push(i)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        props.setCurrentPage(value);
    }


    return (
        <div className="VacationPagination">
            <Pagination
                count={pages.length}
                defaultPage={pages.length / 2}
                page={props.currentPage}
                onChange={handleChange}
                showFirstButton
                showLastButton
                color="primary"
                size="large"
            />
        </div>
    );
}

export default VacationPagination;
