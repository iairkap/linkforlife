import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';
import { useSession } from 'next-auth/react';

interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    refreshData: () => void;
    user: any;
}

interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    onRequestCloseGeneral: () => void;
}

function AddWedding({ isOpen, contentLabel, onRequestClose, refreshData, onRequestCloseGeneral, user }: AddInvProps) {

    const posibleNameEvent = user?.name + ' ' + "&" + " " + user?.partnerName
    console.log(posibleNameEvent)
    const [weddingName, setWeddingName] = React.useState(posibleNameEvent);
    const [weddingPlace, setWeddingPLace] = React.useState('');
    const [weddingDate, setWeddingDate] = useState<string>('');


    const data = {
        weddingName: weddingName,
        weddingPlace: weddingPlace,
        weddingDate: weddingDate
    }


    console.log(user)


    const handleWeddingaAddition = async () => {
        try {
            const wedding = {
                weddingName,
                weddingPlace,
                weddingDate
            };

            const response = await axios.post('/api/wedding', wedding);
            refreshData();
            onRequestClose();
            onRequestCloseGeneral();

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
                        placeholder={posibleNameEvent ? posibleNameEvent : 'שם חתונה'}
                        onChange={(e) => setWeddingName(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={weddingPlace}
                        type="text"
                        placeholder='מקום חתונה'
                        onChange={(e) => setWeddingPLace(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={weddingDate}
                        type={weddingDate ? "date" : "text"}
                        placeholder='תאריך חתונה'
                        onFocus={(e) => e.currentTarget.type = 'date'}
                        onBlur={(e) => {
                            if (!e.currentTarget.value) {
                                e.currentTarget.type = 'text';
                            }
                        }}
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