import React from 'react';
import "../sass/components/dashboardGraphOverview.scss"
import Image from 'next/image';

interface DashboardGraphCardProps {
    cardTitle: string;
    icon: string;
    confirmed: number;
    attending: number;
    notAttending: number;
    notConfirmed: number;
    total: number;
}


function DashboardGraphCard({ cardTitle, icon, confirmed, attending, notAttending, notConfirmed, total }: DashboardGraphCardProps): JSX.Element {
    return (
        <div className='card-container'>
            <div className='title-container'>
                <div className='groom-container'>
                    <Image src={icon} alt="Groom-icon" />
                </div>
                <h3>{cardTitle}</h3>
            </div>
            <div className='all-stats-container'>
                <div className='number-container'>
                    <h5>סה"כ מוזמנים</h5>
                    <h5>{total}</h5>
                </div>
                <hr />
                <div className='number-container'>
                    <h5>נוכחים</h5>
                    <h5>{attending}</h5>
                </div>
                <hr />
                <div className='number-container'>
                    <h5>לא נוכחים</h5>
                    <h5>{notAttending}</h5>
                </div>

            </div>
        </div>
    );
}

export default DashboardGraphCard;