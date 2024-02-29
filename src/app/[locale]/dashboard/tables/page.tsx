import React from 'react';
import ButtonContainerTablesHeader from '../../ui/buttonContainerTablesHeader';
import "../../sass/pages/tablePage.scss"
import TableDashboardContainer from '../../ui/tableDashboardContainer';


function TablesPage() {
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