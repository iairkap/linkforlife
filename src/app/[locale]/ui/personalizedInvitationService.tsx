import React from 'react';
import Image from 'next/image';
import "../sass/components/personalizedServiceInvitation.scss"

function PersonalizedServiceInvitation() {
    return (
        <main >
            <h3 className='title-page' style={{ textAlign: "center", fontWeight: "700" }}>Personalized Invitations Service</h3>
            <div className='imagen-relative' >
                <Image src={'/personalizedInvitationService.png'} alt="image" style={{ objectFit: "contain" }} width={1200} height={806} />
                <div className='image-absolute'>
                    <Image src={'/personalizedInvitationServiceB.png'} alt="image" width={648} height={478} />
                </div>
            </div>
            <p className='text-person'>Highlight your special day with unique invitations. Our design team will work with you to create invitations that not only announce your wedding, but also reflect your love story. Start designing your dream invitations today.</p>
            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", marginTop: "2rem" }}>
                <button className='button-homepageB'>I Want My Free Invitation</button>
            </div>

        </main >
    );
}

export default PersonalizedServiceInvitation;