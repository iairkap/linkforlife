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

    return (
        <div className='fa'>
            <button onClick={previous}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="35" viewBox="0 0 26 35" fill="none">
                <path d="M25.5793 32.4562L25.5793 1.70621C25.5783 1.39488 25.4925 1.08972 25.3309 0.823559C25.1694 0.5574 24.9384 0.34033 24.6627 0.195713C24.387 0.0510964 24.0771 -0.0155912 23.7663 0.00282994C23.4555 0.0212511 23.1556 0.124082 22.8989 0.300256L0.690593 15.6753C-0.230199 16.3125 -0.230199 17.8465 0.690593 18.4855L22.8989 33.8605C23.1551 34.0384 23.4551 34.1428 23.7664 34.1622C24.0777 34.1816 24.3884 34.1154 24.6647 33.9706C24.941 33.8259 25.1723 33.6082 25.3335 33.3412C25.4948 33.0742 25.5798 32.7681 25.5793 32.4562Z" fill="#B5B793" />
            </svg></button>
            <div className={`card-container ${extraction === "he" ? "font-hebrew" : "font-regular"}`}>
                <div className='title-container'>
                    <div className='title-inside'>
                        <div className='groom-container'>
                            <Image src={icon} alt="Groom-icon" />
                        </div>
                        <h3 className='title'>{cardTitle}</h3>
                    </div>

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
            <button onClick={next}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="35" viewBox="0 0 26 35" fill="none">
                <path d="M-0.000200226 1.70931L-0.00020157 32.4593C0.00077444 32.7706 0.0866407 33.0758 0.248153 33.342C0.409665 33.6081 0.640705 33.8252 0.916409 33.9698C1.19211 34.1144 1.50204 34.1811 1.81282 34.1627C2.12361 34.1443 2.42348 34.0414 2.68017 33.8653L24.8885 18.4903C25.8093 17.8531 25.8093 16.319 24.8885 15.6801L2.68018 0.305062C2.42402 0.127097 2.12399 0.0227333 1.81269 0.00331129C1.50139 -0.0161107 1.19072 0.0501515 0.914429 0.194899C0.638142 0.339646 0.406804 0.557342 0.245554 0.824334C0.084304 1.09133 -0.000691501 1.3974 -0.000200226 1.70931Z" fill="#B5B793" />
            </svg></button>
        </div>
    );
}

export default DashboardGraphCard;