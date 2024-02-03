import React from 'react';
import Modal from './modal';
import InputField from './InputField';

interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}

function AddInv({ isOpen, contentLabel, onRequestClose }: AddInvProps) {
    const [value, setValue] = React.useState('');

    return (
        <div>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel}>
                <h2>Hola</h2>
                <InputField
                    value={value}
                    type="text"
                    placeholder='Nombre'
                    onChange={(e) => setValue(e.target.value)}
                    error=''
                />
            </Modal>
        </div>
    );
}

export default AddInv;