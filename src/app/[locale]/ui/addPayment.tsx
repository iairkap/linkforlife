import React from 'react';
import { Wedding } from '@/types/types';


interface Props {
    weddings: Wedding[];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


function AddPayment({ weddings, isOpen, setIsOpen }: Props) {



    return (
        <div>
            <h2>Add Expense</h2>
            <button onClick={() => setIsOpen(true)}>Add</button>        </div>
    );
}

export default AddPayment;