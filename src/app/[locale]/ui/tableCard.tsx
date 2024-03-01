import React from 'react';
import "../sass/components/tableCard.scss"



function TableCard() {
    return (
        <article className='general-table-particle-container'>
            <header className='table-title'></header>
            <div className='diviser'></div>
            <section className='table-list-container'>
                <ol className='list-ol-table'>

                </ol>
            </section>
        </article>
    );
}

export default TableCard;