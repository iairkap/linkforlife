import React from 'react';
import ButtonSideBar from './buttonSideBar';
import rsvp from "../../../../public/rsvp.svg"
import home from "../../../../public/home.svg"
import charts from "../../../../public/charts.svg"
import calendar from "../../../../public/calendar.svg"
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
function ButtonSideBarContainer() {
    const pathName = usePathname();


    const t = useTranslations('Sidebar');
    const icons = [
        {
            icon: home,
            Tooltip: t("dashboard"),
            Link: "/dashboard"
        },
        {
            icon: rsvp,
            Tooltip: t("rsvp"),
            Link: "/dashboard/rsvp"
        },
        {
            icon: charts,
            Tooltip: t("charts"),
            Link: "./payments"
        },
        {
            icon: calendar,
            Tooltip: t("calendar"),
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