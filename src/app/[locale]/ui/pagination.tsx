
import React from 'react';
import "../sass/components/pagination.scss"
import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
    const t = useTranslations("Pagination");




    return (

        <div className="pagination">
            <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className={`filterButtonD ${!canPreviousPage ? 'disabled' : ''}`}
            >
                {t("prev")}            </button>{" "}
            <div className='buttonNumberContainer'>
                {pageOptions.map((_: any, i: number) => (
                    <button
                        key={i}
                        onClick={() => gotoPage(i)}
                        disabled={i === pageIndex}
                        className={i === pageIndex ? "active" : "filterButtonC"}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className={`filterButtonD ${!canNextPage ? 'disabled' : ''}`}
            >
                {t("next")}             </button>{" "}
        </div>
    );
}

export default Pagination;
