import React from 'react';
import InputField from './InputField';
import { useState } from 'react';
import type { InvitationCard, Wedding } from '@/types/types';
import ReactDayPicker from "./datePicker"
import axios from 'axios';

interface Weddings {
    weddings: Wedding[];

}



function formInvitationCard({ invitationCard, weddings }: any) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [partnerLastName, setPartnerLastName] = useState('');
    const [weddingDate, setWeddingDate] = useState<Date | null>(null);
    const [weddingTime, setWeddingTime] = useState('');
    const [weddingPlace, setWeddingPlace] = useState('');
    const [comments, setComments] = useState('')
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/weddingInvitationCard', {
                name,
                lastName,
                partnerName,
                partnerLastName,
                weddingDate,
                weddingTime,
                weddingPlace,
                comments,
                invitationCardModel: invitationCard.model,
                invitationCardId: invitationCard.id
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className='all-containeFr'>
            <div className='title-a'>
                <h2 className='title-form-card'>{invitationCard.model}</h2>
                <h4 className='subtitle-form-card'>Personaliza los datos de las invitaciones</h4>
            </div>
            <section className='form-layout'>
                <article className='article-container-text'>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={"Name"} value={name} name='name' onChange={(e) => setName(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={"Last Name"} value={lastName} name='lastName' onChange={(e) => setLastName(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={"Fiancee's Name"} value={partnerName} name="Fiancee's Name" onChange={(e) => setPartnerName(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={"Fiancee's Last Name"} value={partnerLastName} name="Fiancee's Name" onChange={(e) => setPartnerLastName(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <ReactDayPicker date={weddingDate} onChange={(date: any) => setWeddingDate(date)} />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={"Wedding starting hour"} value={weddingTime} name="Wedding starting hour" onChange={(e) => setWeddingTime(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={"Wedding Place"} value={weddingPlace} name="Wedding Place" onChange={(e) => setWeddingPlace(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={"Comments"} value={comments} name="Comments" onChange={(e) => setComments(e.target.value)} type="text" />
                        </div>
                    </div>
                </article>
                <button className='button-a' onClick={handleSubmit}>Enviar</button>
            </section>
        </main >
    );
}

export default formInvitationCard;