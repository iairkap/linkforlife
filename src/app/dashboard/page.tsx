"use client"

import React from 'react';
import { useGlobalContext } from './globalContext';
import DashboardGraph from '../ui/dashboardGraphOverview';
import { useSession } from 'next-auth/react';

interface DashboardData {
    userInvitationList: any[]; // Reemplaza 'any' con el tipo correcto
    setUserInvitationList: React.Dispatch<React.SetStateAction<any[]>>; // Reemplaza 'any' con el tipo correcto
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    groups: any[]; // Reemplaza 'any' con el tipo correcto
    groupInvitations: any; // Reemplaza 'any' con el tipo correcto
}



function DashboardGeneral() {

    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations } = useGlobalContext() as DashboardData;

    const { data: session } = useSession()


    return (
        <div>
            <DashboardGraph userInvitationList={userInvitationList} />
        </div>
    );
}

export default DashboardGeneral;