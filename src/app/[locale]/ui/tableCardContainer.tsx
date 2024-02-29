import React from 'react';
import TableCard from './tableCard';
import "../sass/layout/tableCardContainer.scss"


function tableCardContainer() {
    return (
        <main className='tableCardContainer-Layout'>
            <TableCard />
            <TableCard />
            <TableCard />
            <TableCard />
            <TableCard />
            <TableCard />
        </main>
    );
}

export default tableCardContainer;