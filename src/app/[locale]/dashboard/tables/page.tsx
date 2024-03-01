"use client"
import React from 'react';
import ButtonContainerTablesHeader from '../../ui/buttonContainerTablesHeader';
import "../../sass/pages/tablePage.scss"
import TableDashboardContainer from '../../ui/tableDashboardContainer';
import { useTableData } from '../../helpers/useTableData';
import Loader from '../../ui/loader';

function TablesPage() {

    const { tableData, loading } = useTableData();
    console.log(tableData)


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
                <ButtonContainerTablesHeader />
            </header>
            <section className='general-table'>
                <TableDashboardContainer />
            </section>
        </main >
    );
}

export default TablesPage;