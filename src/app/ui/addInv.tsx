import React from 'react';
import Modal from './modal';
import InputField from './InputField';

interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}

function AddInv({ isOpen, contentLabel, onRequestClose }: AddInvProps) {
    return (
        <div>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel}>
                <h2>Hola</h2>
                <InputField label="Name" type="text" placeholder='Nombre' />
            </Modal>
        </div>
    );
}

export default AddInv;