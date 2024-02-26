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
import InputField from '@/app/[locale]/ui/InputField';
import FirstSteps from '@/app/[locale]/ui/firstSteps';
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from "../../utils/getLocale"
import { Modal } from '@mui/material';
import { useTranslations } from 'next-intl';
import AddGroup from '../../ui/addGroup';
import ModalGroup from '../../ui/modalGroup';
import CreateToken from '../../ui/createToken';
/* import DragAndDropPicture from '../../ui/DragAndDropPicture';
 */function Dashboard() {
    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations, selectedWedding, setSelectedWedding, weddings, setWeddings, /* handleWeddingChange */
        ModalFirstSteps, setModalFirstSteps, refreshData, user, setGroups } = useDashboardData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [filteredUserInvitationList, setFilteredUserInvitationList] = useState(userInvitationList);
    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName)
    const t = useTranslations("RSVPTABLE");
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
    useEffect(() => {
        refreshData();
    }, []);

    const handleOpenTokenModal = () => {
        setIsShareModalOpen(true);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleOpenGroupModal = () => {
        setIsGroupModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const isWeddingsEmpty = weddings && weddings.length === 0;
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { tableProps, renderTable } = TableInvitationList({
        userInvitationList: filteredUserInvitationList,
        groupInvitations,
        isLoading,
        setIsLoading,
        groups,
        ModalFirstSteps,
        setModalFirstSteps,
        refreshData,
        weddings,
        selectedWedding,
        user,
        extraction
    });

    useEffect(() => {

    }, [userInvitationList]);


    if (isLoading) {
        return (
            <main className='main'>
                <Loader />
            </main>
        );
    }

    let weddingsId = ""; // Declare the variable 'weddingsId'

    if (weddings.length > 0) {
        weddingsId = String(weddings[0].id); // Convert the value to a string before assigning it to 'weddingsId'
    }


    return (
        <main className="main">
            <section className='table-container'>
                <div>
                    <AddInv
                        isOpen={isModalOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="My Modal"
                        setUserInvitationList={setUserInvitationList}
                        userInvitationList={userInvitationList}
                        user={user}
                        groups={groups}
                    />
                    <ModalGroup
                        isOpen={isGroupModalOpen}
                        onRequestClose={() => setIsGroupModalOpen(false)}
                        contentLabel="My Modal"
                        onRequestCloseGeneral={() => setIsGroupModalOpen(false)}
                        weddings={weddings}
                        setGroups={setGroups} // pass setGroups here
                    />
                    <CreateToken
                        isOpen={isShareModalOpen}
                        onRequestClose={() => setIsShareModalOpen(false)}
                        contentLabel="My Modal"
                        weddingId={weddingsId}
                        extraction={extraction}
                    />
                    <div className='first-header'>
                        <div>
                            <h4 className='subtitle'>
                                {t("subtitle")}
                            </h4>
                            {
                                !isWeddingsEmpty &&
                                <button onClick={handleOpenTokenModal}>Compartir formulario RSVP</button>
                            }
                        </div>
                        {

                            !isWeddingsEmpty &&
                            <div className='button-container-header-table'>
                                <button onClick={handleOpenModal} className="buttonPLus">
                                    {t("addInv")}{" "}
                                </button>
                                <button onClick={handleOpenGroupModal} className='buttonPlusGroup'>{t("createGroup")}</button>
                            </div>
                        }
                    </div>
                    {/* 
                    <div><span>Share this link to your contacts to reach their information</span>
                        <div>
                            <span>
                                <a href={`/invitationList/${weddingsId}`} as={`/${extraction}/invitationList/${weddingsId}`}>http://localhost.com{extraction}/invitationList/{weddingsId}</a>
                            </span>
                        </div>
                    </div> */}

                    <div></div>
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
                        extraction={extraction}

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
                {/*                 <DragAndDropPicture />
 */}            </section>
        </main >
    );
}

export default Dashboard;