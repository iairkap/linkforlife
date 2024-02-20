import React, { useEffect } from 'react';
import Modal from './modal';
import type { ModalType } from "../../../types/types"


interface ExpenseDataProps {
    expenseDataSelected: any;
    setExpenseDataSelected: (value: any) => void; // 
}

function ModalPaymentChange({ isOpen, onRequestClose, contentLabel, expenseDataSelected, setExpenseDataSelected }: ModalType & ExpenseDataProps) {



    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onRequestClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onRequestClose]);

    console.log(expenseDataSelected)
    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"Paid"}>

            <section className='containerModalInvitationWedding'>
                <h1>{expenseDataSelected.name}</h1>
            </section>

        </Modal>
    );
}

export default ModalPaymentChange;