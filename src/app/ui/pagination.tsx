
import React from 'react';



interface Props {
    previousPage: () => void;
    nextPage: () => void;
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageOptions: number[];
    pageIndex: number;
    gotoPage: (arg0: number) => void;
}


function Pagination({ previousPage, nextPage, canPreviousPage, canNextPage, pageOptions, pageIndex, gotoPage }: Props) {
    return (

        <div className="pagination">
            <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="filterButton"
            >
                {"< Previous"}
            </button>{" "}
            <div>
                {pageOptions.map((_: any, i: number) => (
                    <button
                        key={i}
                        onClick={() => gotoPage(i)}
                        disabled={i === pageIndex}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="filterButton"
            >
                {"Next >"}
            </button>{" "}
        </div>
    );
}

export default Pagination;
