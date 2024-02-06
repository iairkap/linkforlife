import React from 'react';
import { useGlobalContext } from '../dashboard/globalContext';
import { getInvitationStats } from '@/utils/userInvitationListExtactionData';
import NumberPortion from './numberPortion';
import "../sass/components/dashboardGraphOverview.scss"
import CircleChart from './circleChart';


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
}

interface DashboardGraphProps {
    userInvitationList: UserInvitation[];
}

function DashboardGraph({ userInvitationList }: DashboardGraphProps): JSX.Element {

    const { confirmed, notConfirmed, isAttending, notAttending, invitedBy } = getInvitationStats(userInvitationList);


    return (
        <div>
            <article>
                <div className='container'>
                    <h3>Overiew</h3>
                    <section className='graph-container'>
                        <NumberPortion title="Total Invited" number={userInvitationList.length} />
                        <NumberPortion title="Confirmed" number={confirmed.length} />
                        <NumberPortion title="Not Confirmed" number={notConfirmed.length} />
                        <NumberPortion title="Attending" number={isAttending.length} />
                        <NumberPortion title="Not Attending" number={notAttending.length} />
                    </section>
                </div>
                <div>
                    <section>
                        <CircleChart confirmedNumber={confirmed.length} totalNumber={userInvitationList.length} />
                    </section>
                </div>
            </article>
        </div>
    );
}

export default DashboardGraph;