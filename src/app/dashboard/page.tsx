"use client"

import React, { useEffect } from 'react';
import TableInvitationList from "../ui/invitationList";
import "../sass/pages/dashboard.scss"
import Loader from '../ui/loader';
import { useDashboardData } from '../helpers/useDashboardData';
import AddInv from '../ui/addInv';
import DashboardLayout from './dashboardLayout';
import Graph from '../ui/graph';

function Dashboard() {
    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations } = useDashboardData();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log('userInvitationList has changed:', userInvitationList);
    }, [userInvitationList]);

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
                <div className='title-container'>
                    <h1>לוח בקרה</h1>
                    <Graph userInvitationList={userInvitationList} />
                </div>
                <section className='table-container'>
                    <AddInv
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="My Modal"
                        setUserInvitationList={setUserInvitationList}
                    />
                    <TableInvitationList
                        key={userInvitationList.length} // Agrega esto
                        userInvitationList={userInvitationList}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        groups={groups}
                        groupInvitations={groupInvitations}
                        modalButton={<button onClick={handleOpenModal}>הוסף אורח</button>}
                    />
                </section>
            </main>
        </DashboardLayout>
    );
}

export default Dashboard;