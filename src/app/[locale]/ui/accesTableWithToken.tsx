import React from 'react';
import Modal from './modal';
import { useState } from 'react';
import InputField from './InputField';
import axios from 'axios';
import Button from './button';
import "../sass/layout/modalContent.scss"
import { useTranslations } from 'next-intl';

interface AccesTableWithTokenProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}


function AccesTableWithToken({ isOpen, contentLabel, onRequestClose }: AccesTableWithTokenProps) {


    const [tokenAcces, setTokenAcces] = useState('');
    const t = useTranslations("AccesTableWithToken");
    const data = {
        tokenAcces
    }

    const handleAddToken = async () => {
        try {
            const response = await axios.post('/api/joinwedding', { accesToken: tokenAcces });
            if (response.status === 200) {
                console.log('token added successfully');
            }
        } catch (error) {
            console.error('Failed to add token:', error);
        }
    }





    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} icon={"person_add"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>{t("joinWedding")}</h1>
                <article className="layoutBis">
                    <InputField value={tokenAcces} type="text" onChange={(e) => setTokenAcces(e.target.value)} placeholder={t("enterToken")} error="" />
                    <Button label={t("join")} onClick={handleAddToken} className='button-a' />
                </article>

            </section>

        </Modal>


    );
}

export default AccesTableWithToken;