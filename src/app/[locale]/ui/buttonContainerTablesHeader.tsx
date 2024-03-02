import React from 'react';
import "../sass/pages/dashboard.scss"
import type { TableData, UserInvitation } from '@/types/types';




interface Props {
    setIsOpen: (isOpen: boolean) => void;
    tableData: TableData[];
}


function buttonContainerTablesHeader({ setIsOpen, tableData }: Props) {

    const classNameOptions = tableData.length === 0 ? 'button-container-header-table-disabled' : 'button-container-header-tableActive';


    return (
        <div className='button-container-header-table'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <button className={classNameOptions} onClick={() => setIsOpen(true)}>Add Table</button>
            <button className={classNameOptions}>Download</button>
            <button className={classNameOptions}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div >
    );
}

export default buttonContainerTablesHeader;