import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';
import { useTranslations } from 'next-intl';


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

    const t = useTranslations('AddUserToWeddingList');


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
                <h1 className='title-container'>{t("inviteSomeoneToCollaborate")}</h1>
                <article className="layoutb">
                    <InputField
                        value={emailUser}
                        type="text"
                        placeholder={t("email")}
                        onChange={(e) => setEmailUser(e.target.value)}
                        error=''
                    />
                    <div style={{ width: '100%' }}>
                        <Button label={t("send")} onClick={handleUserInvitation} className='button-a' />
                    </div>
                </article>
            </section>
        </Modal>
    );
}

export default AddUserCollaborator;