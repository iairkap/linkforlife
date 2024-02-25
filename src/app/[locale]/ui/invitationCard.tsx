import React from 'react';
import Image from 'next/image';
import "../sass/layout/invitationCard.scss"

function InvitationCard({ image, name }) {
    return (
        <div className='card-container-invitation-card'>
            <Image src={image} alt="Invitation Card" width={290} height={290} />
            <p>{name}</p>
        </div>
    );
}

export default InvitationCard;