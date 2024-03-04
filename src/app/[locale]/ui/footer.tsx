import React from 'react';
import "../sass/components/footer.scss"
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer className='footer'>
            <h5>We expect you. Celebrate with us our biggest day!</h5>
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