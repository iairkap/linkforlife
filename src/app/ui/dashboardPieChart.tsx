import React from 'react';
import DonutChart from './pieChart';
import "../sass/components/dashboardPieChart.scss"
import ChartLegend from './chartLegend';
import { getInvitationStats } from '@/utils/userInvitationListExtactionData';
import { getAdjustedInvitationStats } from '@/utils/userInvitationListExtactionData';


function DashboardWithPiechart({ userInvitationList }): any {
    const {
        isAttendingTotal,
        notAttendingTotal,
        notConfirmedTotal,
    } = getAdjustedInvitationStats(userInvitationList);

    const invitedTotal = userInvitationList.length;
    console.log(invitedTotal)
    console.log(isAttendingTotal)
    console.log(notAttendingTotal)
    console.log(notConfirmedTotal)

    let data = [
        { label: 'Is Attending', value: isAttendingTotal },
        { label: 'Not Attending', value: notAttendingTotal },
        { label: 'Not Confirmed', value: notConfirmedTotal }
    ];

    if (notConfirmedTotal === 0) {
        data.push({ label: 'Not Attending', value: notAttendingTotal });
    }

    let colors = ['#818369', '#B5B793', '#DBDEAE'];

    // Filtrar datos y colores para eliminar categorías sin datos
    data = data.filter(item => item.value > 0);
    colors = colors.slice(0, data.length);

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    return (
        <article className='containerPie'>
            <div className='layout-inside'>
                <DonutChart data={values} colors={colors} />
                <ChartLegend colors={colors} labels={labels} data={values} />
            </div>
        </article>
    );
}

export default DashboardWithPiechart;