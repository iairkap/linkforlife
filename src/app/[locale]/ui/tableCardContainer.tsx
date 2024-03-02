import React from 'react';
import TableCard from './tableCard';
import "../sass/layout/tableCardContainer.scss"
import type { TableData, UserInvitation } from '@/types/types';

function tableCardContainer({ tableData, userInvitationList }: { tableData: TableData[], userInvitationList: UserInvitation[] }) {
    console.log(tableData)


    return (
        <main className='tableCardContainer-Layout'>
            {tableData.map((table, index) => (
                <TableCard fa={table.id} id={index + 1} numberOfChairs={table.numberOfChairs} weddingInvitationLists={table.weddingInvitationLists} name={table.name || ""} userInvitationList={userInvitationList} />
            ))}
        </main>
    );
}

export default tableCardContainer;