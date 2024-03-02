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
function TablesPage() {

    const { tableData, loading } = useTableData();
    console.log(tableData)
    const [isOpen, setIsOpen] = useState(false)

    const { userInvitationList } = useGlobalContext();
    console.log(userInvitationList)


    if (loading) {
        return (<main className='main'>
            <Loader />
        </main>
        )
    }

    return (
        <main className="maina">
            <header className="header">
                <span>Event tables: <b>Iair & Javier Wedding</b></span>
                <ButtonContainerTablesHeader
                    setIsOpen={setIsOpen}
                />
            </header>
            <section className='general-table'>
                <TableDashboardContainer tableData={tableData} userInvitationList={userInvitationList} />
            </section>
            <AddTable isOpen={isOpen} contentLabel={"Agregar mesas"} onRequestClose={() => setIsOpen(false)} />
        </main >
    );
}

export default TablesPage;