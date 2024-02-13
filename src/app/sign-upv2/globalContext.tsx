import React, { createContext, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';


const GlobalContext = createContext<any | null>(null);



const formSignUp = {
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    lastName: "",
    partnersFirstName: "",
    partnersLastName: "",
    weddingDate: "",
}




const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();
    return (
        <GlobalContext.Provider value={{ session, }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};