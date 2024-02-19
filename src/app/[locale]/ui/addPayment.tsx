import React from 'react';
import { Wedding } from '@/types/types';


interface Props {
    weddings: Wedding[];
}
function AddPayment({ weddings }: Props) {

    console.log(weddings[0])


    return (
        <div>
            <h2>Add Expense</h2>
            <button>Add</button>
        </div>
    );
}

export default AddPayment;