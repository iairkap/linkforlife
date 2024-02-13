import React from 'react';
import "../sass/components/buttons.scss"

function Button({ label, onClick, className, disabled, type, name }: { label: string, onClick?: () => void, className?: string, disabled?: boolean, type?: any, name?: string }) {
    return (
        <div className='button-container'>
            <button onClick={onClick} className={className} type={type}>
                {label}
            </button>
        </div>
    );
}

export default Button;