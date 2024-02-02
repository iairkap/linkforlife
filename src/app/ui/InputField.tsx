import React from 'react';
import "../sass/components/inputs.scss"
function InputField({ value, type, onChange, placeholder }: { value: string, type: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }) {


    const autoComplete = type === 'password' ? 'current-password' : '';

    return (
        <div>
            <input className="my-input" type={type} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} />
        </div>
    );
}

export default InputField;