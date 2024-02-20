import React from 'react';
import "../sass/components/inputs.scss"

function InputField({
    disabled,
    value,
    type,
    onChange,
    placeholder,
    error,
    onFocus = () => { },
    onBlur = () => { }
}: {
    disabled?: boolean,
    value: any;
    type: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    error?: string,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}) {
    const autoComplete = type === 'password' ? 'current-password' : '';
    const inputClass = error ? 'my-input error' : 'my-input'; // Cambia la clase si hay un error
    const displayPlaceholder = error ? error : placeholder; // Cambia el placeholder si hay un error

    return (
        <div>
            <input
                className={inputClass}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={displayPlaceholder}
                autoComplete={autoComplete}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>
    );
}

export default InputField;