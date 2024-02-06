import React from 'react';
import ButtonSideBar from './buttonSideBar';
import rsvp from "../../../public/rsvp.svg"
import home from "../../../public/home.svg"
import charts from "../../../public/charts.svg"
import calendar from "../../../public/calendar.svg"
import { useState } from "react";
import { usePathname } from 'next/navigation';

function ButtonSideBarContainer() {
    const pathName = usePathname();



    const icons = [
        {
            icon: home,
            Tooltip: "לוח בקרה",
            Link: "/dashboard"
        },
        {
            icon: rsvp,
            Tooltip: "רשימת מוזמנים",
            Link: "/dashboard/invitationList"
        },
        {
            icon: charts,
            Tooltip: "תשלומים",
            Link: "./payments"
        },
        {
            icon: calendar,
            Tooltip: "לוח שנה",
            Link: "./calendar"
        },

    ]

    return (
        <div className='side-bar-icons-container'>
            {icons.map((iconObj, index) => (
                <ButtonSideBar
                    key={index}
                    icon={iconObj.icon}
                    Tooltip={iconObj.Tooltip}
                    Link={iconObj.Link}
                    isActive={pathName === iconObj.Link}


                />
            ))}
        </div>
    );
}


export default ButtonSideBarContainer;