import React from 'react';
import Sidebar from '../ui/sideBar';
import "../sass/layout/dashboard.scss"



const DashboardLayout = ({ children }: any) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="content">{children}</div>
        </div>
    );
};

export default DashboardLayout;