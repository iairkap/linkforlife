import React from 'react';
import "../sass/components/homeNavBar.scss"
import Image from 'next/image';
import { useTranslations } from 'next-intl';


function HomeNavBar() {

    const t = useTranslations("HomeNavBar");
    return (
        <nav className='general-nav'>
            <Image src="/finalLogoB.png" alt="logo" width={196} height={38.33} />
            <div className='button-container-nav'>
                <ul className='navBar-home'>
                    <li className="li-nav">Home</li>
                    <li className="li-nav">RSVP</li>
                    <li className="li-nav">Digital Invitation</li>
                    <li className="li-nav">Photo Album</li>
                </ul>
                <button className='button-home-nav'>
                    Sign In
                </button>
            </div>
        </nav>
    );
}

export default HomeNavBar;