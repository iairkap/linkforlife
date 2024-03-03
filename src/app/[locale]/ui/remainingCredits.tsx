import React from 'react';
import "../sass/components/remainingCredit.scss"
function RemainingCredits({ credits }: { credits: number }) {

    return (
        <article className='remaining-credits-container'>
            <h4>You Have</h4>
            <h2>{credits} Free</h2>
            <h4>Remaining Weddinv Invitation</h4>
        </article>
    );
}

export default RemainingCredits;