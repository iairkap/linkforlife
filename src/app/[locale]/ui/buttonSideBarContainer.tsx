import React from 'react';
import ButtonSideBar from './buttonSideBar';
import rsvp from "../../../../public/rsvp.svg"
import home from "../../../../public/home.svg"
import charts from "../../../../public/charts.svg"
import calendar from "../../../../public/calendar.svg"
import invitation from "../../../../public/invitation.svg"
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { usePathname } from "../../../navigation"
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
            Link: "/dashboard/payments"
        },
        {
            icon: calendar,
            Tooltip: t("calendar"),
            Link: "./calendar"
        },
        {
            icon: invitation,
            Tooltip: t("invitation"),
            Link: "/dashboard/invitation"
        }

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