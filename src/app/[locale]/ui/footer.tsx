import React from 'react';
import "../sass/components/footer.scss"
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../utils/getLocale';
function Footer() {

    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName);
    const t = useTranslations('Footer');

    console.log(extraction)

    const classNameFa = extraction === "he" ? "footer-he" : "footer";

    return (
        <footer className={classNameFa}>
            <h5>{t("WeExpectYouCelebrateWithUsOurBiggestDay")}</h5>
            <div className='horizontal-line-div'></div>
            <h4>Weddinvitation</h4>
            <div className='socialMediaIconContainer'>
                <div className='facebook'>
                    <FaFacebookF />
                </div>
                <div className='instagram'>
                    <FaInstagram />
                </div>

            </div>
        </footer>
    );
}

export default Footer;