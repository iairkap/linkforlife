import React from 'react';
import { dateFormat } from '../helpers/dateFormat';
import { countDownDays } from '../helpers/dateFormat';
interface HeaderDashboardProps {
    weddingDate: string;
}


function HeaderDashboard({ weddingDate }: HeaderDashboardProps) {

    const dateFormated = dateFormat(weddingDate)
    const countdownDays = countDownDays(weddingDate)
    return (
        <section>
            <article>
                <span>תאריך חתונה</span>
                <div>
                    <h4>{dateFormated}</h4>
                    <h4>יש עוד {countdownDays} ימים </h4>
                </div>
            </article>
            <article>
            </article>
        </section>
    );
}

export default HeaderDashboard;