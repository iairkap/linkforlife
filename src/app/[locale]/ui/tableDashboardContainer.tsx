import React from 'react';
import TableCardContainer from './tableCardContainer';
import "../sass/layout/tableCardContainer.scss"
import TableFilter from './tableFilter';
import type { TableData, UserInvitation } from '@/types/types';
import NoTablesInitialState from './noTablesInitialState';
import FilterTable from './filterTable';

interface props {
    setIsOpenAddInv: (arg0: boolean) => void;
    deleteGuestAndFetchData: any;

}


function TableDashboardContainer({ tableData, userInvitationList, setIsOpenAddInv, deleteGuestAndFetchData, setTableData, setIsOpen, extraction, t }: { tableData: TableData[]; userInvitationList: UserInvitation[], setIsOpenAddInv: (arg0: boolean) => void; deleteGuestAndFetchData: any; setTableData: any; extraction: any, setIsOpen: (arg0: boolean) => void; t: (key: string) => string; }) {


    console.log(extraction)
    const className = extraction === "he" ? "table-card-container-dash-he" : "table-card-container-dash"


    return (

        <div className='containerGen'  >
            {
                tableData.length === 0 &&
                <NoTablesInitialState setIsOpen={setIsOpen} />
            }
            {tableData.length > 0 &&
                <main className='layout-table-page'>
                    <article className={className}>
                        <TableCardContainer tableData={tableData} userInvitationList={userInvitationList} setIsOpenAddInv={setIsOpenAddInv} deleteGuestAndFetchData={deleteGuestAndFetchData} setTableData={setTableData} extraction={extraction} />

                    </article>
                    <section className='table-filter-container-dash'>
                        <TableFilter setIsOpenAddInv={setIsOpenAddInv} t={t} />
                        <FilterTable t={t} extraction={extraction} />
                    </section>
                </main>
            }
        </div >
    );
}

export default TableDashboardContainer;