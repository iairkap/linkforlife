import React from 'react';

function TableFilter({ }) {
    return (
        <article className='button-filter-container'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <button className='button-filter-table'>
                <span className="material-symbols-outlined">
                    tune
                </span>
                Filter
            </button>
            <div className='dividier'></div>
            <button className='button-filter-table'>
                + Add Guest
            </button>
        </article>
    );
}

export default TableFilter