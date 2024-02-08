import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';


interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}

interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}

function AddWedding({ isOpen, contentLabel, onRequestClose }: AddInvProps) {
    const [weddingName, setWeddingName] = React.useState('');
    const [weddingPlace, setWeddingPLace] = React.useState('');
    const [weddingDate, setWeddingDate] = useState<string>('');


    const data = {
        weddingName: weddingName,
        weddingPlace: weddingPlace,
        weddingDate: weddingDate
    }



    const handleWeddingaAddition = async () => {
        try {
            const wedding = {
                weddingName,
                weddingPlace,
                weddingDate
            };

            const response = await axios.post('/api/wedding', wedding);

            if (response.status === 200) {
                console.log('Invitation added successfully');



            }
        } catch (error) {
            console.error('Failed to add invitation:', error);
        }
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} icon={"celebration"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>Creacion de Boda</h1>
                <article className="layout">
                    <InputField
                        value={weddingName}
                        type="text"
                        placeholder='wedding name'
                        onChange={(e) => setWeddingName(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={weddingPlace}
                        type="text"
                        placeholder='Wedding Place'
                        onChange={(e) => setWeddingPLace(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={weddingDate}
                        type="date"
                        placeholder='אמייל'
                        onChange={(e) => setWeddingDate(e.target.value)}
                        error=''
                    />
                    <Button label='שמור והוסף לרשימה' onClick={handleWeddingaAddition} className='button-a' />
                </article>
            </section>
        </Modal>
    );
}

export default AddWedding;