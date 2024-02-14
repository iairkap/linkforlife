import React from 'react';
import { dateFormat } from '../helpers/dateFormat';
import { countDownDays } from '../helpers/dateFormat';
import "../sass/components/headerDashboard.scss"
interface HeaderDashboardProps {
    weddingDate: Date;
}


function HeaderDashboard({ weddingDate }: HeaderDashboardProps) {

    const dateFormated = dateFormat(weddingDate)
    const countdownDays = countDownDays(weddingDate)
    return (
        <article className='header-container'>
            <section className='first-data'>
                <span> תאריך חתונה : </span>
                <div className='date-container'>
                    <h4 className='titleDate'>{dateFormated}</h4>
                    <h4 className='titleDayRemain'> יש עוד {countdownDays} ימים </h4>
                </div>
            </section>
            <section className='count-down-container'>


            </section>
        </article>
    );
}

export default HeaderDashboard;