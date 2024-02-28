import React from 'react';
import DonutChart from './pieChart';
import "../sass/components/dashboardPieChart.scss"
import ChartLegend from './chartLegend';
import { getInvitationStats } from '@/utils/userInvitationListExtactionData';
import { getAdjustedInvitationStats } from '@/utils/userInvitationListExtactionData';
import type { UserInvitation } from '../../../types/types';

interface userInvitationList {
    userInvitationList: UserInvitation[];
    extraction: string | undefined;
}

function DashboardWithPiechart({ userInvitationList, extraction }: userInvitationList) {
    const {
        isAttendingTotal,
        notAttendingTotal,
        notConfirmedTotal,
    } = getAdjustedInvitationStats(userInvitationList);

    const invitedTotal = userInvitationList.length;

    let data = [
        { label: 'Is Attending', value: isAttendingTotal },
        { label: 'Not Attending', value: notAttendingTotal },
        { label: 'Not Confirmed', value: notConfirmedTotal }
    ];

    if (notConfirmedTotal === 0) {
        data.push({ label: 'Not Attending', value: notAttendingTotal });
    }

    let colors = ['#818369', '#B5B793', '#DBDEAE', "#F3F6C3"];

    // data = data.filter(item => item.value > 0); // Elimina esta línea
    colors = colors.slice(0, data.length);

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    return (
        <article className='containerPie'>
            <div className='layout-inside'>
                <DonutChart data={values} colors={colors} />
                <ChartLegend colors={colors} labels={labels} data={values} extraction={extraction} />
            </div>
        </article>
    );
}

export default DashboardWithPiechart;