import React, { useState } from 'react';
import Modal from './modal';
import type { ModalType } from '@/types/types';
import axios from 'axios';
import InputField from './InputField';
import { useRef } from 'react';

import "../sass/components/addToken.scss"
interface CreateTokenProps {
    weddingId: string;
    extraction: string | undefined;
}


function CreateToken({ isOpen, contentLabel, onRequestClose, weddingId, extraction }: ModalType & CreateTokenProps) {

    const [token, setToken] = useState('');

    console.log(weddingId);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/createToken', { token, weddingId });
            console.log(response);
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
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"groups_3"}>
            <section className='containerModalInvitationWedding'>
                <article style={{
                }}>
                    <h1 className='title-container'>Compartir formulario RSVP</h1>
                    <div className='layoutbis' style={{
                        width: '70%',
                        alignSelf: "center",
                        marginTop: "2rem",
                        marginLeft: "15%",
                    }}>
                        <span style={{ marginBottom: "2rem" }}>
                            Comparte el link con el token que elijas con tus contactos para obtener su información
                        </span>
                        <br />
                        <br />
                        <InputField
                            type="text"
                            placeholder="Token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        <br />
                        <div className='linkContainer'>
                            <input ref={linkRef} value={`https://weddingplanningdashboard.vercel.app/${extraction}/invitationList/${weddingId}`} readOnly className='fafa' />

                            <h5 onClick={copyToClipboard} className='copylink'>Copy Link</h5>
                        </div>
                        <br />

                        <button onClick={handleSubmit} className='button-a'>Update Token</button>
                    </div>
                </article>
            </section>
        </Modal>
    );
}

export default CreateToken;