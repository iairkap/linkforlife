"use client"

import React from 'react';
import { useGlobalContext } from './globalContext';
import DashboardGraph from '../ui/dashboardGraphOverview';


function DashboardGeneral() {

    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations } = useGlobalContext() as DashboardData;



    return (
        <div>
            <DashboardGraph userInvitationList={userInvitationList} />
        </div>
    );
}

export default DashboardGeneral;