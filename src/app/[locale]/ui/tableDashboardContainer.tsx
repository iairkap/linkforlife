import React from 'react';
import TableCardContainer from './tableCardContainer';
import "../sass/layout/tableCardContainer.scss"
import TableFilter from './tableFilter';
import type { TableData, UserInvitation } from '@/types/types';


interface props {
    setIsOpenAddInv: (arg0: boolean) => void;
    deleteGuestAndFetchData: any;
}


function TableDashboardContainer({ tableData, userInvitationList, setIsOpenAddInv, deleteGuestAndFetchData, setTableData }: { tableData: TableData[]; userInvitationList: UserInvitation[], setIsOpenAddInv: (arg0: boolean) => void; deleteGuestAndFetchData: any; setTableData: any; }) {

    return (
        <main className='layout-table-page'>
            <article className='table-card-container-dash'>
                <TableCardContainer tableData={tableData} userInvitationList={userInvitationList} setIsOpenAddInv={setIsOpenAddInv} deleteGuestAndFetchData={deleteGuestAndFetchData} setTableData={setTableData} />
            </article>
            <section className='table-filter-container-dash'>
                {/*                 <div className='divisorLine'></div>
 */}
                <TableFilter setIsOpenAddInv={setIsOpenAddInv} />
            </section>
        </main>
    );
}

export default TableDashboardContainer;