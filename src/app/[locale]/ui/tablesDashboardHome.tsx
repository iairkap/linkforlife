import React from 'react';
import Image from 'next/image';
import { useTableData } from '../helpers/useTableData';
import { useTranslations } from 'next-intl';
import table from "../../../../public/table2.svg"
import "../sass/components/tableDashboard.scss"

function TableDashboardHome() {

    const { tableData } = useTableData();

    const t = useTranslations('TableDashboard');
    console.log(tableData)
    return (
        <section className='dashboard-table-container'>
            <header className='title-table-container'>
                <aside className='icon-profile-container'>
                    <Image src={table} alt="table" />
                </aside>
                <h4 className='title-siting'>{t('SittingPlan')}</h4>
            </header>
            <div className='container-fix'>
                {tableData.slice(0, 3).map((table: any, index: number) => {
                    const guests = table.weddingInvitationLists || [];
                    const filledGuests = [...guests, ...Array(table.numberOfChairs - guests.length).fill({})];
                    return (
                        <div key={table.id} className='list-table'>
                            <h4 className='subtitle-talbe'>Table {String(index + 1).padStart(2, '0')}</h4>
                            <div className='div-hor'></div>
                            <ul>
                                {filledGuests.map((guest: any, guestIndex: number) => (
                                    <li key={guest.id || `empty-${guestIndex}`} className='name-list'>
                                        {guestIndex + 1}. {guest.name || ''} {guest.lastName || ''}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
            <button>
                View All
            </button>
        </section>
    );
}

export default TableDashboardHome;