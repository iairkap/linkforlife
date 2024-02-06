"use client"
import React, { createContext, useContext } from 'react';
import { useDashboardData } from '../helpers/useDashboardData';
import Loader from "../ui/loader" // Asegúrate de importar tu componente Loader

interface DashboardData {
    userInvitationList: any;
    setUserInvitationList: any;
    isLoading: boolean;
    setIsLoading: any;
    groups: any;
    groupInvitations: any;
}

const GlobalContext = createContext<DashboardData | null>(null);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations } = useDashboardData();

    return (
        <GlobalContext.Provider value={{ userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations }}>
            {isLoading ? <div style={{ display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center" }}>
                <Loader />
            </div> : children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export default GlobalProvider;