import React, { useState } from 'react';
import { useGlobalContext } from '../dashboard/globalContext';
import { getInvitationStats } from '@/utils/userInvitationListExtactionData';
import NumberPortion from './numberPortion';
import "../sass/components/dashboardGraphOverview.scss"
import CircleChart from './circleChart';
import DashboardGraphCard from './DashboardGraphCard';
import Groom from "../../../../public/groom.svg"
import Bride from "../../../../public/bride.svg"
import Both from "../../../../public/both.svg"
import { useTranslations } from 'next-intl';

interface UserInvitation {
    id: number;
    name: string;
    lastName: string;
    emailInvitation: string;
    createdAt: string;
    updatedAt: string;
    plusOne: boolean;
    userId: number;
    invitedBy: string[];
    specialRole: string[];
    isAttending: boolean;
    isConfirmed: boolean;
    plusOneConfirmed: boolean;
    groupId: null | number;
    Table: any;
    groups: any[];
    phoneNumber: string;
    weddingId: number;
}

interface DashboardGraphProps {
    userInvitationList: UserInvitation[];
    user: any;
}

function DashboardGraph({ userInvitationList, user, extraction }: { userInvitationList: any[], user: any, extraction: string | undefined }): JSX.Element {
    const [currentPage, setCurrentPage] = useState(1);
    const { confirmedByUser,
        confirmedByUserPartner,
        confirmedTotal,
        notConfirmedByUser,
        notConfirmedByUserPartner,
        notConfirmedTotal,
        isAttendingByUser,
        isAttendingByUserPartner,
        isAttendingTotal,
        notAttendingByUser,
        notAttendingByUserPartner,
        notAttendingTotal,
        invitedByUser,
        invitedByUserPartner,
        confirmedByUserFamily,
        confirmedByUserPartnerFamily,
        confirmedByBothUserAndUserPartner,
        notConfirmedByUserFamily,
        notConfirmedByUserPartnerFamily,
        notConfirmedByBothUserAndUserPartner,
        isAttendingByUserFamily,
        isAttendingByUserPartnerFamily,
        isAttendingByBothUserAndUserPartner,
        notAttendingByUserFamily,
        notAttendingByUserPartnerFamily,
        notAttendingByBothUserAndUserPartner,
        invitedByUserPartnerFamily,
        invitedByBothUserAndUserPartner,
        invitedByUserFamily,
    } = getInvitationStats(userInvitationList, user);

    const invitedTotal = userInvitationList.length;

    let iconUser = "";
    switch (user.role) {
        case "BRIDE":
            iconUser = Bride;
            break;
        case "GROOM":
            iconUser = Groom;
            break;
        default:
            iconUser = Both;
            break;
    }

    let iconPartner = "";
    switch (user.partnerRole) {
        case "BRIDE":
            iconPartner = Bride;
            break;
        case "GROOM":
            iconPartner = Groom;
            break;
        default:
            iconPartner = Both;
            break;
    }

    const t = useTranslations('DashboardStats');

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const cards = [
        <DashboardGraphCard cardTitle={`${t("invitedBy")} ${user.partnerName}`} icon={iconPartner} confirmed={confirmedByUserPartner} attending={isAttendingByUserPartner} notAttending={notAttendingByUserPartner} notConfirmed={notConfirmedByUserPartner} total={invitedByUserPartner} extraction={extraction} next={handleNext} currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <DashboardGraphCard cardTitle={`${t("invitedBy")} ${(user.name)}`} icon={iconUser} confirmed={confirmedByUser} attending={isAttendingByUser} notAttending={notAttendingByUser} notConfirmed={notConfirmedByUser} total={invitedByUser} extraction={extraction} next={handleNext} previous={handlePrev} currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <DashboardGraphCard cardTitle={`${t("invitedBy")} ${(user.name)} & ${user.partnerName}`} icon={iconUser} confirmed={confirmedByBothUserAndUserPartner} attending={isAttendingByBothUserAndUserPartner} notAttending={notAttendingByBothUserAndUserPartner} notConfirmed={notConfirmedByBothUserAndUserPartner} total={invitedByBothUserAndUserPartner} extraction={extraction} next={handleNext} previous={handlePrev} currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <DashboardGraphCard cardTitle={`${t("invitedBy")} ${(user.partnerName)}'s family`} icon={iconUser} confirmed={confirmedByUserPartnerFamily} attending={isAttendingByUserPartnerFamily} notAttending={notAttendingByUserPartnerFamily} notConfirmed={notConfirmedByUserPartnerFamily} total={invitedByUserPartnerFamily} extraction={extraction} next={handleNext} previous={handlePrev} currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <DashboardGraphCard cardTitle={`${t("invitedBy")} ${(user.name)}'s  family`} icon={iconUser} confirmed={confirmedByUserFamily} attending={isAttendingByUserFamily} notAttending={notAttendingByUserFamily} notConfirmed={notConfirmedByUserFamily} total={invitedByUserFamily} extraction={extraction} next={handleNext} previous={handlePrev} currentPage={currentPage} setCurrentPage={setCurrentPage} />,
        <DashboardGraphCard cardTitle={`${t("totalInvited")}`} icon={Both} confirmed={confirmedTotal} attending={isAttendingTotal} notAttending={notAttendingTotal} notConfirmed={notConfirmedTotal} total={invitedTotal} extraction={extraction} previous={handlePrev} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    ];

    return (
        <div className={`dash-card-container ${extraction === "he" ? "font-hebrew" : "font-regular"}`}>
            <div className='DashboardGraphCard'>
                {cards[currentPage]}
            </div>

        </div>
    );
}

export default DashboardGraph;