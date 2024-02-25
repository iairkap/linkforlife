import React from 'react';
import InvitationCard from './InvitationCard';
import "../sass/layout/invitationCardContainergrid.scss"


function InvitationCardContainer({ cards }) {
    return (
        <article className='cardGridContainerA'>
            {cards.map((card) => (
                <InvitationCard key={card.id} image={card.image} name={card.name} />
            ))}
        </article>
    );
}

export default InvitationCardContainer;