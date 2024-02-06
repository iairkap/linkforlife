// Dashboard.jsx

"use client"
import React, { useEffect, useState } from 'react';
import TableInvitationList from "../../ui/invitationList";
import "../../sass/pages/dashboard.scss"
import Loader from '../../ui/loader';
import { useDashboardData } from '../../helpers/useDashboardData';
import AddInv from '../../ui/addInv';
import Graph from '../../ui/graph';
import HeaderFilter from "../../ui/tableReference"

function Dashboard() {
    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations } = useDashboardData();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [isMenuOpen, setMenuOpen] = useState(false);

    const { tableProps, renderTable } = TableInvitationList({
        userInvitationList,
        groupInvitations,
        isLoading,
        setIsLoading,
        groups,
    });

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
        <main className="main">
            <section className='table-container'>
                <AddInv
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="My Modal"
                    setUserInvitationList={setUserInvitationList}
                />
                <HeaderFilter
                    getToggleHideAllColumnsProps={tableProps.getToggleHideAllColumnsProps} // Pasa esto aquí
                    isMenuOpen={isMenuOpen}
                    setMenuOpen={setMenuOpen}
                    allColumns={tableProps.allColumns}
                    preGlobalFilteredRows={tableProps.preGlobalFilteredRows}
                    globalFilter={""}
                    setGlobalFilter={tableProps.setGlobalFilter}
                    pageSize={tableProps.state.pageSize}
                    setPageSize={tableProps.setPageSize}
                    handleOpenModal={handleOpenModal}
                />
                {renderTable}
            </section>
        </main>
    );
}

export default Dashboard;