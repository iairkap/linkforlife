import React from 'react';
import "../sass/pages/dashboard.scss"
import type { TableData, UserInvitation } from '@/types/types';
import axios from 'axios';



interface Props {
    setIsOpen: (isOpen: boolean) => void;
    tableData: TableData[];
}


function buttonContainerTablesHeader({ setIsOpen, tableData }: Props) {

    const classNameOptions = tableData.length === 0 ? 'button-container-header-table-disabled' : 'button-container-header-tableActive';

    const handleDownloadClick = () => {
        axios.get('/api/downloadTable', {
            responseType: 'blob', // Indicate that we want the response data to be a Blob
        })
            .then((res) => {
                const blob = new Blob([res.data], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'WeddingInvitation-Tables.csv'; // The file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <div className='button-container-header-table'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <button className={classNameOptions} onClick={() => setIsOpen(true)}>Add Table</button>
            <button className={classNameOptions}
                onClick={handleDownloadClick}
            >Download</button>
            <button className={classNameOptions}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div >
    );
}

export default buttonContainerTablesHeader;