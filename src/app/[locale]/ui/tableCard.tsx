import React from 'react';
import "../sass/components/tableCard.scss"



function TableCard() {
    return (
        <article className='general-table-particle-container'>
            <header className='table-title'>Table 1</header>
            <div className='diviser'></div>
            <section className='table-list-container'>
                <ol className='list-ol-table'>
                    <li>Iair Kaplun</li>
                    <li>Iair Kaplun</li>
                    <li>Iair Kaplun</li>
                    <li>Iair Kaplun</li>
                    <li>Iair Kaplun</li>
                    <li>Iair Kaplun</li>
                    <li>Iair Kaplun</li>
                    <li>Iair Kaplun</li>
                </ol>
            </section>
        </article>
    );
}

export default TableCard;