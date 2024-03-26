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
                    <li className="li-nav">
                        <a href="#RSVP">
                            {t("RSVP")}
                        </a>
                    </li>
                    <li className="li-nav">
                        <a href="#about">
                            {t("about")}
                        </a>
                    </li>
                    <li className="li-nav">
                        <a href="#digitalInvitation">
                            {t("DigitalInvitation")}
                        </a>
                    </li>
                    <li className="li-nav">
                        <a href="#contact">
                            {t("ContactUs")}
                        </a>
                    </li>
                </ul>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Link href={"./sign-up"}>
                        <button className='button-home-nav'>
                            {t("SignUp")}
                        </button>
                    </Link>
                    <Link href={"./log-in"}>
                        <button className='button-home-nav'>
                            {t("LogIn")}
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBar;