"use client"

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './globalContext';
import DashboardGraph from '../ui/dashboardGraphOverview';
import AddWedding from '../ui/addWedding';
import AddUserCollaborator from '../ui/addUserToTheWeddingList';
import AccesTableWithToken from '../ui/accesTableWithToken';
import { useRouter } from 'next/navigation';
import HeaderDashboard from '../ui/headerDashboard';
import { useDashboardData } from '../helpers/useDashboardData';
import Loader from '../ui/loader';
import ModalGroup from '../ui/modalGroup';
import "../sass/layout/dashboard.scss"
import PieChart from "../ui/pieChart";
import DashboardWithPiechart from '../ui/dashboardPieChart';
import { getInvitationStats } from '@/utils/userInvitationListExtactionData';
import DashboardGroups from '../ui/DashboardGroups';
import { Pie } from 'react-chartjs-2';
interface DashboardData {
    userInvitationList: any[]; // Reemplaza 'any' con el tipo correcto
    setUserInvitationList: React.Dispatch<React.SetStateAction<any[]>>; // Reemplaza 'any' con el tipo correcto
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    groups: Groups[];
    groupInvitations: any; // Reemplaza 'any' con el tipo correcto
    weddings: any[];
}

interface Groups {
    id: number;
    name: string;
    userId: number;
    weddingId: number;
}

function DashboardGeneral() {


    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations, selectedWedding, setSelectedWedding, weddings, setWeddings, /* handleWeddingChange */
        ModalFirstSteps, setModalFirstSteps, refreshData, user } = useDashboardData();


    const [weddingDate, setWeddingDate] = useState(new Date());
    console.log(userInvitationList)
    const [isModalGroupOpen, setIsModalGroupOpen] = useState(false);



    useEffect(() => {
        if (weddings && weddings.length > 0) {
            setUserInvitationList(weddings[0]?.weddingInvitationList);
/*             setWeddingDate(weddings[0].weddingDate);
 */   setWeddingDate(weddings[0].weddingDate);
        }
    }, [weddings]);

    console.log(weddings)

    const areWedding = weddings && weddings.length > 0;

    console.log(isLoading)
    console.log(userInvitationList)
    console.log(groups)
    if (isLoading) {
        return <Loader />
    }

    return (
        <article className='containerDash'>
            <HeaderDashboard weddingDate={weddingDate} />
            <DashboardGraph userInvitationList={userInvitationList} user={user} />
            <div className='graph-container-pair'>
                <DashboardGroups groups={groups} setIsModalOpen={setIsModalGroupOpen} />
                <DashboardWithPiechart userInvitationList={userInvitationList} />
            </div>
            {
                isModalGroupOpen && <ModalGroup isOpen={isModalGroupOpen} contentLabel="Add Group" onRequestClose={() => setIsModalGroupOpen(false)} onRequestCloseGeneral={() => setIsModalGroupOpen(false)} weddings={weddings} />
            }


        </article>

    );
}

export default DashboardGeneral;




/*   

    const [isModalOpenCreateWedding, setIsModalOpenCreateWedding] = useState(false);
    const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
    const [isAccesTableWithTokenOpen, setIsAccesTableWithTokenOpen] = useState(false);


<button onClick={() => { setIsModalOpenCreateWedding(true) }}>Create Wedding</button>
            <button onClick={() => { setIsInvitationModalOpen(true) }}>Invite someone to your wedding list</button>
            <AddUserCollaborator isOpen={isInvitationModalOpen} contentLabel="Add Collaborator" onRequestClose={() => setIsInvitationModalOpen(false)} />
            <button onClick={() => { setIsAccesTableWithTokenOpen(true) }}>Join Table</button>
            <AccesTableWithToken isOpen={isAccesTableWithTokenOpen} contentLabel="Join existent table" onRequestClose={() => setIsAccesTableWithTokenOpen(false)} /> */