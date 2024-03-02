import React from 'react';
import TableCardContainer from './tableCardContainer';
import "../sass/layout/tableCardContainer.scss"
import TableFilter from './tableFilter';
import type { TableData, UserInvitation } from '@/types/types';
import NoTablesInitialState from './noTablesInitialState';

interface props {
    setIsOpenAddInv: (arg0: boolean) => void;
    deleteGuestAndFetchData: any;
}


function TableDashboardContainer({ tableData, userInvitationList, setIsOpenAddInv, deleteGuestAndFetchData, setTableData, setIsOpen }: { tableData: TableData[]; userInvitationList: UserInvitation[], setIsOpenAddInv: (arg0: boolean) => void; deleteGuestAndFetchData: any; setTableData: any; setIsOpen: (arg0: boolean) => void; }) {





    return (


        <div className='containerGen'  >
            {
                tableData.length === 0 &&
                <NoTablesInitialState setIsOpen={setIsOpen} />
            }
            {tableData.length > 0 &&
                <main className='layout-table-page'>
                    <article className='table-card-container-dash'>
                        <TableCardContainer tableData={tableData} userInvitationList={userInvitationList} setIsOpenAddInv={setIsOpenAddInv} deleteGuestAndFetchData={deleteGuestAndFetchData} setTableData={setTableData} />
                    </article>
                    <section className='table-filter-container-dash'>

                        <TableFilter setIsOpenAddInv={setIsOpenAddInv} />
                    </section>
                </main>
            }
        </div >
    );
}

export default TableDashboardContainer;