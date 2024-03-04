"use client"
import React, { createContext, useContext, useState } from 'react';
import { useDashboardData } from '../helpers/useDashboardData';
import Loader from "../ui/loader" // Asegúrate de importar tu componente Loader
import { useSession } from 'next-auth/react';
import AddUserCollaborator from '../ui/addUserToTheWeddingList';
import { DashboardData } from '@/types/types';

const GlobalContext = createContext<DashboardData | null>(null);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations, weddings, setWeddings, refreshData, user, invitedByOptions, filteruserInvitationListByGroup, filteredInvitations, setFilteredInvitations, setGroupIds, groupIds } = useDashboardData();
    const { data: session, status } = useSession();
    const [isOpenModalAddUser, setIsOpenModalAddUser] = useState(false);


    return (
        <GlobalContext.Provider value={{ userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations, weddings, setWeddings, session, refreshData, isOpenModalAddUser, setIsOpenModalAddUser, user, invitedByOptions, filteruserInvitationListByGroup, filteredInvitations, setFilteredInvitations, setGroupIds, groupIds }}>
            {isLoading ? <div style={{ display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center" }}>
                <Loader />
            </div> : children}
            <AddUserCollaborator isOpen={isOpenModalAddUser} contentLabel="Add User" onRequestClose={() => setIsOpenModalAddUser(false)} />
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export default GlobalProvider;