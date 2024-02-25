import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';

interface modalGroupProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    onRequestCloseGeneral: () => void;
    weddings: any[];
    setGroups: (groups: any) => void;

}


function ModalGroup({ isOpen, contentLabel, onRequestClose, onRequestCloseGeneral, weddings, setGroups }: modalGroupProps) {

    const { fetchData, isLoading, setIsLoading, } = useDashboardData();

    const [form, setForm] = useState({
        name: "",
        weddingId: weddings[0]?.id
    })


    const weddingId = weddings[0]?.id;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/groupsList', form);
            const newGroup = response.data; // assuming the response contains the new group
            setGroups((prevGroups: any[]): any => [...prevGroups, newGroup]); // update the groups state immediately
            fetchData();
            onRequestCloseGeneral();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"groups_3"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>Creacion de grupos</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        type="text"
                        placeholder="nombre del grupo"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <button type='submit'>Enviar</button>                </form>
            </section>
        </Modal>
    );
}

export default ModalGroup;