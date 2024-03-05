import React from 'react';
import "../sass/components/homeNavBar.scss"
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

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
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Link href={"./sign-up"}>
                        <button className='button-home-nav'>
                            Sign In
                        </button>
                    </Link>
                    <Link href={"./log-in"}>
                        <button className='button-home-nav'>
                            Log In
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBar;