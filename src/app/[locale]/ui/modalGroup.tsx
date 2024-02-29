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
    const [form, setForm] = useState<{ name: string, names: string[], weddingId: number | undefined }>({
        name: "",
        names: [],
        weddingId: weddings[0]?.id
    })

    const weddingId = weddings[0]?.id;

    const handleAddOtherGroup = () => {
        setForm({ ...form, names: [...form.names, form.name], name: "" });
    }

    const handleSubmit = async () => {
        try {
            const allGroupNames = [...form.names, form.name];
            const groups = allGroupNames.map(name => ({ name, weddingId: form.weddingId }));
            const response = await axios.post('/api/groupsList', groups);
            const newGroup = response.data;
            console.log(response.data)
            setGroups((prevGroups: any[]): any => [...prevGroups, ...newGroup])
            fetchData();
            onRequestCloseGeneral();
        } catch (error) {
            console.error(error);
            console.log(error)
        }
    }
    return (

        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"groups_3"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>Creacion de grupos</h1>
                {form.names.map((name, index) => (
                    <InputField
                        key={index}
                        type="text"
                        placeholder="Nombre del grupo"
                        value={name}
                        onChange={(e) => {
                            const newNames = [...form.names];
                            newNames[index] = e.target.value;
                            setForm({ ...form, names: newNames });
                        }}
                    />
                ))}
                <InputField
                    type="text"
                    placeholder="Nombre del grupo"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <div className='add-other-children'>
                    <button onClick={handleAddOtherGroup} className='button-add-children'>Agregar Otro Grupo</button>
                </div>
                <br />
                <button onClick={handleSubmit} className='button-a'>Enviar</button>
            </section>
        </Modal>
    );
}

export default ModalGroup;