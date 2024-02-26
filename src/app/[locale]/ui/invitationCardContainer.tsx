"use client"

import React from 'react';
import InvitationCardA from "./invitationCard" // Fix the casing of the import statement
import "../sass/layout/invitationCardContainergrid.scss"
import { useState } from 'react';
import type { InvitationCard } from "../../../types/types"

interface InvitationCardContainer {
    cards: InvitationCard[];
}

function InvitationCardContainer({ cards }: InvitationCardContainer) {

    const [favorites, setFavorites] = useState<Record<number, boolean>>({});

    const toggleFavorite = (id: number) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [id]: !prevFavorites[id]
        }));
    };
    console.log(cards)

    return (
        <article className='cardGridContainerA'>
            {cards.map((card) => (
                <InvitationCardA
                    key={card.id}
                    id={card.id}
                    image={card.url}
                    name={card.name}
                    favorite={favorites[card.id]}
                    toggleFavorite={() => toggleFavorite(card.id)}
                />
            ))}
        </article>
    );
}

export default InvitationCardContainer;