import React from 'react';
import "../sass/components/dashboardGraphOverview.scss"
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from "../../../navigation"
interface DashboardGraphCardProps {
    cardTitle: string;
    icon: string;
    confirmed: number;
    attending: number;
    notAttending: number;
    notConfirmed: number;
    total: number;
    extraction: string | undefined;
    next?: () => void;
    previous?: () => void;
    setCurrentPage?: (page: number) => void;
    currentPage?: number;
    cards?: any[];
}


function DashboardGraphCard({ cardTitle, icon, confirmed, attending, notAttending, notConfirmed, total, extraction, next, previous, setCurrentPage, currentPage, cards }: DashboardGraphCardProps): JSX.Element {

    const t = useTranslations('DashboardStats');
    console.log(extraction)
    console.log(cardTitle)

    const classNameHebrew = extraction === 'he' ? 'name-titleAFHE' : 'name-titleAF';
    const classNameHebrewB = extraction === 'he' ? 'name-titleAFAHE' : 'name-titleAFA';

    return (
        <div className='main-container-card'>
            <aside className={classNameHebrew}>
                <h2 className='initial'>{cardTitle}</h2>
                <h2>{t("guest").toUpperCase()}</h2>
            </aside>
            <div className='attending'>
                <h2 className='initial'>{attending}</h2>
                <p>{t("attending")}</p>
            </div>
            <div className='notAttending'>
                <h2 className='initial'>{notAttending}</h2>
                <p>{t("notAttending")}</p>
            </div>
            <div className='notConfirmed'>
                <h2 className='initial'>{notConfirmed}</h2>
                <p>{t("notConfirmed")}</p>
            </div>
            <div className={classNameHebrewB}>
                <h2 className='initial'>{total}</h2>
                <p>{t("e")}</p>
            </div>
        </div >
    );
}

export default DashboardGraphCard;