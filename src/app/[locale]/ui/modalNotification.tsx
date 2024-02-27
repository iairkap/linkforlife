import React from 'react';
import Modal from './modal';
import { signIn, getSession } from "next-auth/react"
import { useTranslations } from 'next-intl';

interface ModalNotificationProps {
    message: string;
    status: number;
    isOpen: boolean;
    onRequestClose: () => void;
    email?: string;
    password?: string;
    formdata?: any;
    credits?: number;
}


function ModalNotification({ message, status, isOpen, onRequestClose, email, password, formdata, credits }: ModalNotificationProps) {


    const t = useTranslations("ModalNotification");

    let icon;
    let title;
    switch (status) {
        case 200:
            icon = "done";
            title = t("done");
            break;
        case 500:
            icon = "error";
            title = t("error");
            break;
        default:
            icon = "done";
            break;
    }


    return (
        <Modal icon={icon} isOpen={isOpen} contentLabel={"Notification"} onRequestClose={onRequestClose} >
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>{title}</h1>
                <article className="layoutBis">
                    <p className='modal-text-container' style={{ textAlign: "center" }}>{message}</p>

                    {credits && <p className='modal-text-container' style={{ textAlign: "center" }}>{t("creditosRestantes")} {credits}</p>}

                    <button onClick={onRequestClose} className="button-a">{t("close")}</button>
                </article>
            </section>

        </Modal>
    );
}

export default ModalNotification;