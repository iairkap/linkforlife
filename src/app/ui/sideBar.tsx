import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import "../sass/components/sideBar.scss"
import Image from 'next/image';
const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const animation = useSpring({
        width: isExpanded ? 200 : 50,
    });

    return (
        <section className='side-bar'>
            <animated.div style={animation} className="sidebar">
                <div className='logo-container'>
                    <Image src="/logofinal.png" alt="logo" width={150} height={40} />

                </div>
                <br />
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    <MenuIcon />
                </button>
                <ul>
                    <li>
                        <HomeIcon />
                        {isExpanded && <span>לוח בקרה</span>}
                    </li>
                    <li>
                        <EmailIcon />
                        {isExpanded && <span>אורחים</span>}
                    </li>
                </ul>
            </animated.div>
        </section>
    );
};

export default Sidebar;