import React from 'react';
import { Wedding } from '@/types/types';


interface Props {
    weddings: Wedding[];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    t: (key: string) => string;
}


function AddPayment({ weddings, isOpen, setIsOpen, t }: Props) {



    return (
        <div>
            <h2>{t("addExpense")}</h2>
            <button onClick={() => setIsOpen(true)}>{t("add")}</button>        </div>
    );
}

export default AddPayment;