import React from 'react';


interface ConfigurationPaymentsCardProps {
    setConfiguration: (value: boolean) => void;
}

function ConfigurationPaymentsCard({ setConfiguration }: ConfigurationPaymentsCardProps) {


    return (
        <div>
            <button onClick={() => setConfiguration(true)}>
                Settings
            </button>
        </div>
    );
}

export default ConfigurationPaymentsCard;