"use client"
import React from 'react';
import ButtonContainerTablesHeader from '../../ui/buttonContainerTablesHeader';
import "../../sass/pages/tablePage.scss"
import TableDashboardContainer from '../../ui/tableDashboardContainer';
import { useTableData } from '../../helpers/useTableData';
import Loader from '../../ui/loader';
import AddTable from '../../ui/addTable';
import { useState } from 'react';
import { useGlobalContext } from '../globalContext';
import AddInv from '../../ui/addInv';
import { useTranslations } from 'next-intl';
import { filter } from 'd3';
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../../utils/getLocale';


function TablesPage() {

    const { tableData, loading, deleteGuestAndFetchData, setTableData } = useTableData();
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddInv, setIsOpenAddInv] = useState(false)
    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName)
    console.log(extraction)
    const { userInvitationList, user, groups, setUserInvitationList, invitedByOptions, filteruserInvitationListByGroup, filteredInvitations } = useGlobalContext() || {};
    const handleCloseModal = () => {
        setIsOpenAddInv(false);
    }


    const t = useTranslations('tablePage');


    if (loading) {
        return (
            <main className='main'>
                <Loader />
            </main>
        )
    }

    return (
        <main className="maina">
            <header className="header">
                <span>{t("weddingTable")} <b>{user.name} & {user.partnerName}</b></span>
                <ButtonContainerTablesHeader setIsOpen={setIsOpen} tableData={tableData} t={t} />
            </header>
            <section className='general-table'>
                <TableDashboardContainer tableData={tableData} userInvitationList={filteredInvitations} setIsOpenAddInv={setIsOpenAddInv} deleteGuestAndFetchData={deleteGuestAndFetchData} setTableData={setTableData}
                    setIsOpen={setIsOpen}
                    extraction={extraction}
                    t={t}
                />
            </section>
            <AddTable isOpen={isOpen} contentLabel={"Agregar mesas"} onRequestClose={() => setIsOpen(false)} setTableData={setTableData} />
            <AddInv isOpen={isOpenAddInv} onRequestClose={handleCloseModal} contentLabel="My Modal" setUserInvitationList={(list: any[]) => setUserInvitationList && setUserInvitationList(list)} userInvitationList={userInvitationList} user={user} groups={groups} invitedByOptions={invitedByOptions}
            />


        </main>
    );
}

export default TablesPage;