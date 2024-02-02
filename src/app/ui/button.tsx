import React from 'react';
import "../sass/components/buttons.scss"

function Button({ label, onClick, className }: { label: string, onClick: () => void, className?: string }) {
    return (
        <div className='button-container'>
            <button onClick={onClick} className={className}>
                {label}
            </button>
        </div>
    );
}

export default Button;