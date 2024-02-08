"use client"

import React, { useState } from 'react';
import { useGlobalContext } from './globalContext';
import DashboardGraph from '../ui/dashboardGraphOverview';
import AddWedding from '../ui/addWedding';
import AddUserCollaborator from '../ui/addUserToTheWeddingList';
interface DashboardData {
    userInvitationList: any[]; // Reemplaza 'any' con el tipo correcto
    setUserInvitationList: React.Dispatch<React.SetStateAction<any[]>>; // Reemplaza 'any' con el tipo correcto
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    groups: any[]; // Reemplaza 'any' con el tipo correcto
    groupInvitations: any; // Reemplaza 'any' con el tipo correcto
}

function DashboardGeneral() {
    const [isModalOpenCreateWedding, setIsModalOpenCreateWedding] = useState(false);
    const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);






    return (
        <div>
            <button onClick={() => { setIsModalOpenCreateWedding(true) }}>Create Wedding</button>
            <AddWedding isOpen={isModalOpenCreateWedding} contentLabel="Add Wedding" onRequestClose={() => setIsModalOpenCreateWedding(false)} />
            <button>Invite someone to your wedding list</button>
            <AddUserCollaborator isOpen={isInvitationModalOpen} contentLabel="Add Collaborator" onRequestClose={() => setIsInvitationModalOpen(false)} />
        </div>
    );
}

export default DashboardGeneral;