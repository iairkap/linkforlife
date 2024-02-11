import React from 'react';
import "../sass/components/buttons.scss"

function Button({ label, onClick, className, disabled }: { label: string, onClick: () => void, className?: string, disabled?: boolean }) {
    return (
        <div className='button-container'>
            <button onClick={onClick} className={className}>
                {label}
            </button>
        </div>
    );
}

export default Button;