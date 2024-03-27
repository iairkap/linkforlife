import React from 'react';


interface ConfigurationPaymentsCardProps {
    setConfiguration: (value: boolean) => void;
    t: (key: string) => string;
}

function ConfigurationPaymentsCard({ setConfiguration, t }: ConfigurationPaymentsCardProps) {


    return (
        <div>
            <button onClick={() => setConfiguration(true)}>
                {t("settings")}
            </button>
        </div>
    );
}

export default ConfigurationPaymentsCard;