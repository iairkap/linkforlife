import React from 'react';
import Sidebar from '../ui/sideBar';
import "../sass/layout/dashboard.scss"
import GlobalProvider from './globalContext';
import Header from '../ui/header';




const DashboardLayout = ({ children }: any) => {
    console.log(GlobalProvider)


    return (
        <GlobalProvider>
            <div className="dashboard-layout">
                <Sidebar />
                <div className="flex">
                    <Header />
                    <div className='content'>{children}</div>
                </div>
            </div>
        </GlobalProvider>
    );
};

export default DashboardLayout;