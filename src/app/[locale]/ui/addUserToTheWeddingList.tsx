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

function AddUserCollaborator({ isOpen, contentLabel, onRequestClose }: AddInvProps) {




    const [emailUser, setEmailUser] = useState<string>('');
    const data = {
        emailUser: emailUser
    }



    const handleUserInvitation = async () => {
        try {

            const response = await axios.post('/api/emailUser', { emailUser }); // Pass emailUser as an object

            if (response.status === 200) {
            }
        } catch (error) {

            console.error('Failed to add invitation:', error);

        }
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} icon={"celebration"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>Invite someone to Collaborate</h1>
                <article className="layout">
                    <InputField
                        value={emailUser}
                        type="text"
                        placeholder='אמייל'
                        onChange={(e) => setEmailUser(e.target.value)}
                        error=''
                    />
                    <Button label='שלח הזמנה לשיתוף' onClick={handleUserInvitation} className='button-a' />
                </article>
            </section>
        </Modal>
    );
}

export default AddUserCollaborator;