import React from 'react';
import "../sass/components/inputs.scss"

function InputField({
    value,
    type,
    onChange,
    placeholder,
    error,
    onFocus = () => { },
    onBlur = () => { }
}: {
    value: string,
    type: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    error: string,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}) {
    const autoComplete = type === 'password' ? 'current-password' : '';
    const inputClass = error ? 'my-input error' : 'my-input'; // Cambia la clase si hay un error

    return (
        <div>
            <input
                className={inputClass}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {error && <div className="error-message">{error}</div>} {/* Muestra el mensaje de error si hay un error */}
        </div>
    );
}

export default InputField;