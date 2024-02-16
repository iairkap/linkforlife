import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import axios from 'axios';


interface modalGroupProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    onRequestCloseGeneral: () => void;
    weddings: any[];

}


function ModalGroup({ isOpen, contentLabel, onRequestClose, onRequestCloseGeneral, weddings }: modalGroupProps) {


    const [form, setForm] = useState({
        name: "",
        weddingId: weddings[0]?.id
    })


    const weddingId = weddings[0]?.id;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/groupsList', form);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose}>
            <div className='modal-content'>
                <h1 className='title-container'>Creacion de grupos</h1>
                <form onSubmit={handleSubmit}>
                    <h6>este es el modal para agregar grupos</h6>
                    <InputField
                        type="text"
                        placeholder="nombre del grupo"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <button type='submit'>Enviar</button>                </form>
                <button onClick={onRequestCloseGeneral}>סגירה</button>
            </div>
        </Modal>
    );
}

export default ModalGroup;