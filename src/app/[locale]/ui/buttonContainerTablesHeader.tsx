import React from 'react';
import "../sass/pages/dashboard.scss"



interface Props {
    setIsOpen: (isOpen: boolean) => void;
}


function buttonContainerTablesHeader({ setIsOpen }: Props) {
    return (
        <div className='button-container-header-table'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

            <button className="buttonPLus" onClick={() => setIsOpen(true)}>Add Table</button>
            <button className="buttonPLus">Download</button>
            <button className="buttonPLus">
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div >
    );
}

export default buttonContainerTablesHeader;