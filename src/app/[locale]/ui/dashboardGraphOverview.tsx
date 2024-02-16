import React from 'react';
import { useGlobalContext } from '../dashboard/globalContext';
import { getInvitationStats } from '@/utils/userInvitationListExtactionData';
import NumberPortion from './numberPortion';
import "../sass/components/dashboardGraphOverview.scss"
import CircleChart from './circleChart';
import DashboardGraphCard from './DashboardGraphCard';
import Groom from "../../../../public/groom.svg"
import Bride from "../../../../public/bride.svg"
import Both from "../../../../public/both.svg"
import { splitName } from '../utils/splitName';
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

function DashboardGraph({ userInvitationList, user }: { userInvitationList: any[], user: any }): JSX.Element {

    const { confirmedByBride,
        confirmedByGroom,
        confirmedTotal,
        notConfirmedByBride,
        notConfirmedByGroom,
        notConfirmedTotal,
        isAttendingByBride,
        isAttendingByGroom,
        isAttendingTotal,
        notAttendingByBride,
        notAttendingByGroom,
        notAttendingTotal,
        invitedByBride,
        invitedByGroom, } = getInvitationStats(userInvitationList);

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

    return (
        <div className='dash-card-container'>
            <div className='DashboardGraphCard'>
                <DashboardGraphCard cardTitle={`${t("invitedBy")} ${user.partnerName}`} icon={iconPartner} confirmed={confirmedByGroom} attending={isAttendingByGroom} notAttending={notAttendingByGroom} notConfirmed={notConfirmedByGroom} total={invitedByGroom} />
            </div>
            <div className='DashboardGraphCard'>
                <DashboardGraphCard cardTitle={`${t("invitedBy")} ${splitName(user.name)}`} icon={iconUser} confirmed={confirmedByBride} attending={isAttendingByBride} notAttending={notAttendingByBride} notConfirmed={notConfirmedByBride} total={invitedByBride} />
            </div>
            <div className='DashboardGraphCard'>
                <DashboardGraphCard cardTitle={`${t("totalInvited")}`} icon={Both} confirmed={confirmedTotal} attending={isAttendingTotal} notAttending={notAttendingTotal} notConfirmed={notConfirmedTotal} total={invitedTotal} />
            </div>
        </div>
    );
}

export default DashboardGraph;