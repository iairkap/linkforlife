import React from 'react';
import { dateFormat } from '../helpers/dateFormat';
import { countDownDays } from '../helpers/dateFormat';
import "../sass/components/headerDashboard.scss"
import { useTranslations } from 'next-intl';
interface HeaderDashboardProps {
    weddingDate: Date;
    extraction: string | undefined;
}


function HeaderDashboard({ weddingDate, extraction }: HeaderDashboardProps) {
    const t = useTranslations('DashboardHeaderDates');


    const dateFormated = dateFormat(weddingDate, extraction)
    const countdownDays = countDownDays(weddingDate)

    const missingDays = (extraction: string | undefined) => {
        if (extraction === "he") {
            return ` יש עוד ${countdownDays} ימים`
        } else if (extraction === "es") {
            return `Faltan ${countdownDays} días`
        } else if (extraction === "en") {
            return `${countdownDays} days left`
        }
    }

    return (
        <article className='header-container'>
            <section className='first-data'>
                <span> {t("date")} </span>
                <div className='date-container'>
                    <h4 className='titleDate'>{dateFormated}</h4>
                    <h4 className='titleDayRemain'>{missingDays(extraction)}</h4>                </div>
            </section>
            <section className='count-down-container'>


            </section>
        </article>
    );
}

export default HeaderDashboard;
