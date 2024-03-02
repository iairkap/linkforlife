import React from 'react';
import TableCardContainer from './tableCardContainer';
import "../sass/layout/tableCardContainer.scss"
import TableFilter from './tableFilter';
import type { TableData } from '@/types/types';



function TableDashboardContainer({ tableData, userInvitationList }: { tableData: TableData[] }) {

    console.log(tableData)
    return (
        <main className='layout-table-page'>
            <article className='table-card-container-dash'>
                <TableCardContainer tableData={tableData} userInvitationList={userInvitationList} />
            </article>
            <section className='table-filter-container-dash'>
                {/*                 <div className='divisorLine'></div>
 */}
                <TableFilter />
            </section>
        </main>
    );
}

export default TableDashboardContainer;