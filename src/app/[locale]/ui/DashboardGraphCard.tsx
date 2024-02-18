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
}


function DashboardGraphCard({ cardTitle, icon, confirmed, attending, notAttending, notConfirmed, total, extraction }: DashboardGraphCardProps): JSX.Element {

    const t = useTranslations('DashboardStats');

    return (
        <div className={`card-container ${extraction === "he" ? "font-hebrew" : "font-regular"}`}>
            <div className='title-container'>
                <div className='groom-container'>
                    <Image src={icon} alt="Groom-icon" />
                </div>
                <h3 className='title'>{cardTitle}</h3>
            </div>
            <div className='all-stats-container'>
                <div className='number-container'>
                    <h5>{t("totalInvited")}</h5>
                    <h5 className='colorA'>{total}</h5>
                </div>
                <hr />
                <div className='number-container'>
                    <h5>{t("attending")}</h5>
                    <h5 className='colorB'>{attending}</h5>
                </div>
                <hr />
                <div className='number-container'>
                    <h5>{t("notAttending")}</h5>
                    <h5 className='colorC'>{notAttending}</h5>
                </div>

            </div>
            <div className='call-to-action'>
                <Link href={"dashboard/rsvp"}>
                    <span>Ver invitados</span>

                </Link>
            </div>

        </div>
    );
}

export default DashboardGraphCard;