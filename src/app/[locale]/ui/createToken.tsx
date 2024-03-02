import React, { useState } from 'react';
import Modal from './modal';
import type { ModalType } from '@/types/types';
import axios from 'axios';
import InputField from './InputField';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import "../sass/components/addToken.scss"
interface CreateTokenProps {
    weddingId: string;
    extraction: string | undefined;
}


function CreateToken({ isOpen, contentLabel, onRequestClose, weddingId, extraction }: ModalType & CreateTokenProps) {
    const [token, setToken] = useState('');
    const t = useTranslations('CreateToken');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/createToken', { token, weddingId });
            (response);
            onRequestClose();
        } catch (error) {
            console.error(error);
        }

    }


    const linkRef = useRef<HTMLInputElement>(null);

    const copyToClipboard = (e: any) => {
        if (linkRef.current) {
            linkRef.current.select();
            document.execCommand('copy');
            e.target.focus();
        }
    };





    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"person_add"}>
            <section className='containerModalInvitationWedding'>
                <article style={{
                }}>
                    <h1 className='title-container'>{t("title")}</h1>
                    <span className='text-align'>
                        {t("subtitle")}
                    </span>
                    <div className='layoutbis' style={{
                        width: '70%',
                        alignSelf: "center",
                        marginTop: "2rem",
                        marginLeft: "15%",
                    }}>
                        <div className='container-input-text'>
                            <InputField
                                type="text"
                                placeholder=""
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                            <span className='token-span'>{t("token")}</span>
                        </div>
                        <br />
                        <div className='linkContainer'>
                            <input ref={linkRef} value={`weddingplanningdashboard.com/${extraction}/invitationList/${weddingId}`} readOnly className='fafa' />

                            <h5 onClick={copyToClipboard} className='copylink'>{t("copy")}</h5>
                        </div>
                        <br />

                        <button onClick={handleSubmit} className='button-a'>{t("updateToken")}</button>
                    </div>
                </article>
            </section>
        </Modal>
    );
}

export default CreateToken;