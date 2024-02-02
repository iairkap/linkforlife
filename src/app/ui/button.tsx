import React from 'react';


function Button({ label, onClick }: { label: string, onClick: () => void }) {
    return (
        <div>
            <button onClick={onClick}>
                {label}
            </button>
        </div>
    );
}

export default Button;