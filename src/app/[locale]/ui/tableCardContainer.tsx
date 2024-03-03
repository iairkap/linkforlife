import React from 'react';
import TableCard from './tableCard';
import "../sass/layout/tableCardContainer.scss"
import type { TableData, UserInvitation } from '@/types/types';

function tableCardContainer({ tableData, userInvitationList, setIsOpenAddInv, deleteGuestAndFetchData, setTableData }: { tableData: TableData[], userInvitationList: UserInvitation[], setIsOpenAddInv: (arg0: boolean) => void; deleteGuestAndFetchData: any; setTableData: any; }) {
    console.log(tableData)



    return (
        <main className='tableCardContainer-Layout'>
            {tableData.map((table, index) => (
                <TableCard fa={table.id} id={index + 1} numberOfChairs={table.numberOfChairs} weddingInvitationLists={table.weddingInvitationLists} name={table.name || ""} userInvitationList={userInvitationList} setIsOpenAddInv={setIsOpenAddInv} deleteGuestAndFetchData={deleteGuestAndFetchData}
                />
            ))}
        </main>
    );
}

export default tableCardContainer;