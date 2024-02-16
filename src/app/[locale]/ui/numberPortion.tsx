import React from 'react';
import "../sass/components/numberPortion.scss"
function NumberPortion({ title, number }: { title: string, number: number }) {
    return (
        <div className='container'>
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
    );
}

export default NumberPortion;