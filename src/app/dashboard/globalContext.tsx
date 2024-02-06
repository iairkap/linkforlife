"use client"
import React, { createContext, useContext } from 'react';
import { useDashboardData } from '../helpers/useDashboardData';
// Define el tipo de tus datos del dashboard aquí
interface DashboardData {
    userInvitationList: any; // Reemplaza 'any' con el tipo correcto
    setUserInvitationList: any; // Reemplaza 'any' con el tipo correcto
    isLoading: boolean;
    setIsLoading: any; // Reemplaza 'any' con el tipo correcto
    groups: any; // Reemplaza 'any' con el tipo correcto
    groupInvitations: any; // Reemplaza 'any' con el tipo correcto
}

const GlobalContext = createContext<DashboardData | null>(null);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations } = useDashboardData();

    return (
        <GlobalContext.Provider value={{ userInvitationList, setUserInvitationList, isLoading, setIsLoading, groups, groupInvitations }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export default GlobalProvider;