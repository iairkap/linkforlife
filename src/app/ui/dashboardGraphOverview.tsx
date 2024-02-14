import React from 'react';
import { useGlobalContext } from '../dashboard/globalContext';
import { getInvitationStats } from '@/utils/userInvitationListExtactionData';
import NumberPortion from './numberPortion';
import "../sass/components/dashboardGraphOverview.scss"
import CircleChart from './circleChart';
import DashboardGraphCard from './DashboardGraphCard';
import Groom from "../../../public/groom.svg"
import Bride from "../../../public/bride.svg"
import Both from "../../../public/both.svg"

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

    return (
        <div className='dash-card-container'>
            <DashboardGraphCard cardTitle={`מוזמנים על ידי ${user.partnerName}`} icon={Groom} confirmed={confirmedByGroom} attending={isAttendingByGroom} notAttending={notAttendingByGroom} notConfirmed={notConfirmedByGroom} total={invitedByGroom} />
            <DashboardGraphCard cardTitle={`מוזמנים על ידי ${user.name}`} icon={Bride} confirmed={confirmedByBride} attending={isAttendingByBride} notAttending={notAttendingByBride} notConfirmed={notConfirmedByBride} total={invitedByBride} />
            <DashboardGraphCard cardTitle={`סה"כ מוזמנים`} icon={Both} confirmed={confirmedTotal} attending={isAttendingTotal} notAttending={notAttendingTotal} notConfirmed={notConfirmedTotal} total={invitedTotal} />
        </div>
    );
}

export default DashboardGraph;