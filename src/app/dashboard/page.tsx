"use client"

import React from 'react';
import TableInvitationList from "../ui/invitationList";
import "../sass/pages/dashboard.scss"
import Loader from '../ui/loader';
import { useDashboardData } from '../helpers/useDashboardData';
import AddInv from '../ui/addInv';
import DashboardLayout from './dashboardLayout';
import Graph from '../ui/graph';

function Dashboard() {
    const { userInvitationList, isLoading, setIsLoading, groups, groupInvitations } = useDashboardData();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return (
            <main className='main'>
                <Loader />
            </main>
        );
    }

    return (
        <DashboardLayout>
            <main className="main">
                <h1>לוח בקרה</h1>
                <Graph userInvitationList={userInvitationList} />
                <section className='table-container'>
                    <AddInv isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="My Modal" />
                    <TableInvitationList userInvitationList={userInvitationList}
                        isLoading={isLoading} setIsLoading={setIsLoading}
                        groups={groups} groupInvitations={groupInvitations}
                        modalButton={<button onClick={handleOpenModal}>Open Modal</button>}

                    />
                </section>
            </main>
        </DashboardLayout>
    );
}

export default Dashboard;