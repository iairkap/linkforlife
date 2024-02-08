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
import Pagination from "../../ui/pagination"
import InputField from '@/app/ui/InputField';

function Dashboard() {
    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations, selectedWedding, setSelectedWedding, weddings, setWeddings, handleWeddingChange
    } = useDashboardData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [filteredUserInvitationList, setFilteredUserInvitationList] = useState(userInvitationList);


    useEffect(() => {
        const newFilteredUserInvitationList = userInvitationList.filter(invitation => {
            if (filter === 'confirmed') {
                return invitation.isConfirmed;
            } else if (filter === 'notConfirmed') {
                return !invitation.isConfirmed;
            } else {
                return true;
            }
        });

        setFilteredUserInvitationList(newFilteredUserInvitationList);
    }, [userInvitationList, filter]);
    console.log(filter)




    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [isMenuOpen, setMenuOpen] = useState(false);

    const { tableProps, renderTable } = TableInvitationList({
        userInvitationList: filteredUserInvitationList,
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

    console.log('userInvitationList:', userInvitationList);

    return (
        <main className="main">
            <h4 className='subtitle'>
                רשימת אורחים            </h4>
            <section className='table-container'>
                <div>
                    <AddInv
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="My Modal"
                        setUserInvitationList={setUserInvitationList}
                    />
                    <select name="table-selection" id="table-selection" onChange={handleWeddingChange}>
                        <option value="">Select a wedding...</option>
                        {weddings.map(wedding => (
                            <option key={wedding.id} value={wedding.id}>{wedding.weddingName}</option>
                        ))}
                    </select>
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
                        setFilter={setFilter}
                        filter={filter}

                    />
                    {renderTable}
                    <Pagination
                        previousPage={tableProps.previousPage}
                        nextPage={tableProps.nextPage}
                        canPreviousPage={tableProps.canPreviousPage}
                        canNextPage={tableProps.canNextPage}
                        pageOptions={tableProps.pageOptions}
                        pageIndex={tableProps.state.pageIndex}
                        gotoPage={tableProps.gotoPage}
                    />

                </div>
            </section>
        </main>
    );
}

export default Dashboard;