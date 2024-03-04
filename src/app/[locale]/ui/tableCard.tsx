import React, { useState } from 'react';
import "../sass/components/tableCard.scss"
import FreeSolo from './autoComplete';
import axios from 'axios';
import { useTableData } from '../helpers/useTableData';
import EditTable from './editTable';
import { set } from 'date-fns';
import { useGlobalContext } from '../dashboard/globalContext';

interface TableCardProps {
    fa?: number;
    numberOfChairs: number;
    weddingInvitationLists: any[];
    name: string;
    id: number;
    userInvitationList: any[];
    deleteGuestAndFetchData?: any;
    setIsOpenAddInv?: any;
    setTableData?: any;

}
function TableCard({ fa, id, numberOfChairs, weddingInvitationLists, name, userInvitationList, deleteGuestAndFetchData, setIsOpenAddInv, setTableData }: TableCardProps) {
    const initialChairNames = Array(numberOfChairs).fill('');
    weddingInvitationLists.forEach((list, index) => {
        if (index < numberOfChairs) {
            initialChairNames[index] = list.name + (" ") + list.lastName;
        }
    });
    const [chairNames, setChairNames] = useState(initialChairNames);
    const [hoverIndex, setHoverIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [idTable, setIdTable] = useState(0);

    const { setFilteredInvitations } = useGlobalContext() || {};


    console.log(idTable)


    const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChairNames = [...chairNames];
        newChairNames[index] = event.target.value;
        setChairNames(newChairNames);
        const selectedInvitation = userInvitationList.find((option) => `${option.name} ${option.lastName}` === event.target.value);
        if (selectedInvitation) {

            axios.patch('/api/addGuestToTable', {
                tableId: fa,
                weddingInvitationID: selectedInvitation.id,
            })
                .then(response => {
                    const updatedUserInvitationList = userInvitationList.filter((option) => option.id !== selectedInvitation.id);
                    console.log(updatedUserInvitationList)
                    setFilteredInvitations(updatedUserInvitationList);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    console.log(error)
                });
        }
    };


    const handleOpenEditModal = () => {
        setIdTable(fa || 0);
        setIsOpen(true);
    }




    return (
        <article className='general-table-particle-container'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <header className='table-title'>
                {name ? <span>{name}</span> : <span>Table {id}</span>}
                <div className='button-settings'>
                    <button onClick={() => handleOpenEditModal()}>
                        <span className="material-symbols-outlined">
                            settings
                        </span>
                    </button>
                </div>
            </header>
            <div className='diviser'></div>
            <section className='table-list-container'>
                <ol className='list-ol-table'>
                    {Array.from({ length: numberOfChairs }).map((_, i) => (
                        <div className='list-elementCont'>
                            <li key={i} className='list-element'>
                                <div style={{ display: 'flex', width: "100%", alignItems: "center" }}>
                                    <span className='index-span'>{i + 1}:</span>
                                    <FreeSolo
                                        fa={fa}
                                        id={id}
                                        initialChairNames={initialChairNames}
                                        userInvitationList={userInvitationList}
                                        value={chairNames[i]}
                                        onChange={handleInputChange(i)}
                                        readOnly={initialChairNames[i] !== ""}
                                    />
                                </div>
                                {chairNames[i] && (
                                    <button onClick={() => {
                                        const selectedInvitation = userInvitationList.find((option) => `${option.name} ${option.lastName}` === chairNames[i]);
                                        if (selectedInvitation) {
                                            deleteGuestAndFetchData(fa, selectedInvitation.id);
                                        }
                                    }}>
                                        <span className='delete-user-table'>x</span>
                                    </button>
                                )}
                            </li>
                        </div>
                    ))}
                </ol>
            </section>
            <EditTable isOpen={isOpen} contentLabel={"Modificar Mesa"} onRequestClose={() => setIsOpen(false)} tableID={idTable} />

        </article >
    );
}

export default TableCard;