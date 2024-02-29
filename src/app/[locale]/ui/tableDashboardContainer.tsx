import React from 'react';
import TableCardContainer from './tableCardContainer';
import "../sass/layout/tableCardContainer.scss"
import TableFilter from './tableFilter';

function TableDashboardContainer() {
    return (
        <main className='layout-table-page'>
            <article className='table-card-container-dash'>
                <TableCardContainer />
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