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
import { DashboardDataB as DashboardData, Groups } from '@/types/types';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../utils/getLocale';
import DashboardLastConfirmed from '../ui/lastConfirmed';
import UpcomingPayment from '../ui/upcomingPayment';


function DashboardGeneral() {


    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations, selectedWedding, setSelectedWedding, weddings, setWeddings, /* handleWeddingChange */
        ModalFirstSteps, setModalFirstSteps, refreshData, user, upcomingExpenses, setUpcomingExpenses } = useDashboardData();


    const [weddingDate, setWeddingDate] = useState(new Date());
    const [isModalGroupOpen, setIsModalGroupOpen] = useState(false);

    const t = useTranslations('Dashboard');
    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName)



    useEffect(() => {
        if (weddings && weddings.length > 0) {
            setUserInvitationList(weddings[0]?.weddingInvitationList);
/*             setWeddingDate(weddings[0].weddingDate);
 */   setWeddingDate(weddings[0].weddingDate);
        }
    }, [weddings]);

    console.log(upcomingExpenses)



    const areWedding = weddings && weddings.length > 0;

    if (isLoading) {
        return (<main className='main'>
            <Loader />
        </main>

        )
    }

    return (
        <article className='containerDash'>
            <div className='containerDashito'>
                <DashboardGraph userInvitationList={userInvitationList} user={user} extraction={extraction} />
                <UpcomingPayment upcomingExpenses={upcomingExpenses ? (Array.isArray(upcomingExpenses) ? upcomingExpenses : [upcomingExpenses]) : []} extraction={extraction} />            </div>
            <div className='graph-container-pair'>
                <DashboardWithPiechart userInvitationList={userInvitationList} extraction={extraction} />
                <DashboardLastConfirmed userInvitationList={userInvitationList} extraction={extraction} />
            </div>
            {
                isModalGroupOpen && <ModalGroup isOpen={isModalGroupOpen} contentLabel="Add Group" onRequestClose={() => setIsModalGroupOpen(false)} onRequestCloseGeneral={() => setIsModalGroupOpen(false)} weddings={weddings} />
            }


        </article>

    );
}

export default DashboardGeneral;


