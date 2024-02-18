"use client"

import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import "../sass/components/sideBar.scss"
import Image from 'next/image';
import HamburguerIcon from './hamburguerIcon';
import ButtonSideBarContainer from './buttonSideBarContainer';
import { signOut } from "next-auth/react"
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../utils/getLocale';
const Sidebar = () => {
    /*     const [isExpanded, setIsExpanded] = useState(true);
        const animation = useSpring({
            width: isExpanded ? 200 : 50,
        }); */


    const pathname = usePathname()
    const extraction = extractLocaleFromPathName(pathname)

    return (
        <section className={`'side-bar' ${extraction == "he" ? "side-bar-he" : "side-bar-en-es"}`}>
            <animated.div className="sidebar">
                <div className='logo-container'>
                    <Image src="/finalLogoB.png" alt="logo" width={196} height={38.33} />

                    <button onClick={() => { }} className='button'>
                    </button>
                </div>
                <div>
                    <ButtonSideBarContainer />
                </div>
                <div>
                </div>

            </animated.div>
        </section>
    );
};

export default Sidebar;