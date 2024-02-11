import React from 'react';
import "../sass/layout/modalContent.scss"
interface Props {
    name: string;
    partnerName: string;
    date: string;
}

function SaveTheDateInitialSignUp({ name, partnerName, date }: Props) {
    return (
        <div className='container'>
            <header className='title-header'>
                <h2>מזל טוב</h2>
            </header>
            <div className='name-wedding'>
                <h5>{name}</h5>
                <h5>{partnerName}</h5>
            </div>
        </div>
    );
}

export default SaveTheDateInitialSignUp;