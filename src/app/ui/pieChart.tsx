/* import React from 'react';
import { getInvitationStats } from '@/utils/userInvitationListExtactionData'
import { PieChart } from '@mui/x-charts/PieChart';
;




function PieChart({ userInvitationList }) {


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


    // necesito hacer un pie chart con la info de cuantos invitados totales hay, y despues calcular en el pie chart el % de los que confirmaron, los que estan pendientes de confirmacion, los que asisten y los que no asisten




    return (
        <div>


        </div>
    );
}

export default PieChart; */