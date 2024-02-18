import React from 'react';
import Sidebar from '../ui/sideBar';
import "../sass/layout/dashboard.scss"
import GlobalProvider from './globalContext';
import Header from '../ui/header';



const DashboardLayout = ({ children }: any) => {





    return (
        <GlobalProvider>
            <div className="dashboard-layout">
                <Sidebar />
                <div className="flexa">
                    <div className="padding-header">
                        <Header />
                    </div>
                    <div className='content'>{children}</div>
                </div>

            </div>

        </GlobalProvider>
    );
};

export default DashboardLayout;