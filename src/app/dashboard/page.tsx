"use client"

import React from 'react';
import TableInvitationList from "../ui/invitationList";
import "../sass/pages/dashboard.scss"
import Loader from '../ui/loader';
import { useDashboardData } from '../helpers/useDashboardData';
import AddInv from '../ui/addInv';
function Dashboard() {
    const { userInvitationList, isLoading, setIsLoading, groups, groupInvitations } = useDashboardData();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        console.log('Opening modal...');

        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log('Closing modal...');

        setIsModalOpen(false);
    };

    if (isLoading) {
        return (
            <main>
                <Loader />
            </main>
        );
    }

    return (
        <main>
            <section className='table-container'>
                <button onClick={handleOpenModal}>Open Modal</button>
                <AddInv isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="My Modal" />
                <TableInvitationList userInvitationList={userInvitationList}
                    isLoading={isLoading} setIsLoading={setIsLoading}
                    groups={groups} groupInvitations={groupInvitations}
                />
            </section>
        </main>
    );
}

export default Dashboard;