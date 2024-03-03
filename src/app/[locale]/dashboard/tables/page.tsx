"use client"
import React from 'react';
import ButtonContainerTablesHeader from '../../ui/buttonContainerTablesHeader';
import "../../sass/pages/tablePage.scss"
import TableDashboardContainer from '../../ui/tableDashboardContainer';
import { useTableData } from '../../helpers/useTableData';
import Loader from '../../ui/loader';
import AddTable from '../../ui/addTable';
import { useState } from 'react';
import { useGlobalContext } from '../globalContext';
import AddInv from '../../ui/addInv';
function TablesPage() {

    const { tableData, loading, deleteGuestAndFetchData, setTableData } = useTableData();
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddInv, setIsOpenAddInv] = useState(false)
    const { userInvitationList, user, groups, setUserInvitationList, invitedByOptions, } = useGlobalContext() || {}; // Add null check here
    const handleCloseModal = () => {
        setIsOpenAddInv(false);
    }


    if (loading) {
        return (
            <main className='main'>
                <Loader />
            </main>
        )
    }

    return (
        <main className="maina">
            <header className="header">
                <span>Event tables: <b>Iair & Javier Wedding</b></span>
                <ButtonContainerTablesHeader setIsOpen={setIsOpen} tableData={tableData} />
            </header>
            <section className='general-table'>
                <TableDashboardContainer tableData={tableData} userInvitationList={userInvitationList} setIsOpenAddInv={setIsOpenAddInv} deleteGuestAndFetchData={deleteGuestAndFetchData} setTableData={setTableData}
                    setIsOpen={setIsOpen}
                />
            </section>
            <AddTable isOpen={isOpen} contentLabel={"Agregar mesas"} onRequestClose={() => setIsOpen(false)} setTableData={setTableData} />
            <AddInv isOpen={isOpenAddInv} onRequestClose={handleCloseModal} contentLabel="My Modal" setUserInvitationList={(list: any[]) => setUserInvitationList && setUserInvitationList(list)} userInvitationList={userInvitationList} user={user} groups={groups} invitedByOptions={invitedByOptions}
            />


        </main>
    );
}

export default TablesPage;