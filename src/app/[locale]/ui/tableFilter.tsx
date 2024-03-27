import React from 'react';

function TableFilter({ setIsOpenAddInv, t }: { setIsOpenAddInv: (arg0: boolean) => void; t: (key: string) => string; }) {
    return (
        <article className='button-filter-container'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <button className='button-filter-table'>
                <span className="material-symbols-outlined">
                    tune
                </span>
                {t("filter")}
            </button>
            <div className='dividier'></div>
            <button className='button-filter-table' onClick={() => setIsOpenAddInv(true)}>
                {t("addGuest")} +
            </button>
        </article>
    );
}

export default TableFilter