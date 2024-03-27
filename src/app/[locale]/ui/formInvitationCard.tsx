import React from 'react';
import InputField from './InputField';
import { useState } from 'react';
import type { InvitationCard, Wedding } from '@/types/types';
import ReactDayPicker from "./datePicker"
import axios from 'axios';
import ModalNotification from './modalNotification';
import { useTranslations } from 'next-intl';
interface Weddings {
    weddings: Wedding[];

}



function formInvitationCard({ invitationCard, weddings, credits }: any) {

    const t = useTranslations('FormInvitationCard');

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [partnerLastName, setPartnerLastName] = useState('');
    const [weddingDate, setWeddingDate] = useState<Date | null>(null);
    const [weddingTime, setWeddingTime] = useState('');
    const [weddingPlace, setWeddingPlace] = useState('');
    const [comments, setComments] = useState('')
    const [notification, setNotification] = useState(false)
    const [res, setRes] = useState<number>(0);
    const [message, setMessage] = useState("");
    const [remaingingCredits, setRemainingCredits] = useState<number>(credits);

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

            if (response.status === 502) {
                setMessage(t("NoCredits"));
                setRes(500);
                setNotification(true); // Abre el modal
                return;
            }

            if (response.status === 200) {
                setMessage(t("invitationSent"));
                setRemainingCredits(credits - 1);
                setRes(200);
                setNotification(true); // Abre el modal
                return;
            }

        } catch (error) {
            console.error(error);
            setMessage(t("NoCredits"));
            setRes(500);
            setNotification(true); // Abre el modal
        }
    };

    return (
        <main className='all-containeFr'>
            <div className='title-a'>
                <h2 className='title-form-card'>{invitationCard.model}</h2>
                <h4 className='subtitle-form-card'>{t("personalizaLosDatosDeLasInvitaciones")}</h4>
            </div>
            <section className='form-layout'>
                <article className='article-container-text'>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={t("name")} value={name} name='name' onChange={(e) => setName(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={t("lastName")} value={lastName} name='lastName' onChange={(e) => setLastName(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={t("partnerName")} value={partnerName} name="Fiancee's Name" onChange={(e) => setPartnerName(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={t("partnerLastName")} value={partnerLastName} name="Fiancee's Name" onChange={(e) => setPartnerLastName(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container' style={{ width: "100%" }}>
                        <div className="input-containerBisaBis" style={{ width: "100%" }}>
                            <ReactDayPicker date={weddingDate} onChange={(date: any) => setWeddingDate(date)} />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={t("weddingTime")} value={weddingTime} name="Wedding starting hour" onChange={(e) => setWeddingTime(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={t("weddingPlace")} value={weddingPlace} name="Wedding Place" onChange={(e) => setWeddingPlace(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className='input-container'>
                        <div className="input-containerBisaBis">
                            <InputField placeholder={t("comments")} value={comments} name="Comments" onChange={(e) => setComments(e.target.value)} type="text" />
                        </div>
                    </div>
                </article>
                <button className='button-a' onClick={handleSubmit}>{t("send")}</button>
            </section>
            <ModalNotification
                status={res}
                isOpen={notification}
                message={message}
                onRequestClose={() => setNotification(false)}
                credits={remaingingCredits}
            />
        </main >
    );
}

export default formInvitationCard;