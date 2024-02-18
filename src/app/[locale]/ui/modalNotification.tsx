import React from 'react';
import Modal from './modal';
import { signIn, getSession } from "next-auth/react"

interface ModalNotificationProps {
    message: string;
    status: number;
    isOpen: boolean;
    onRequestClose: () => void;
    email?: string;
    password?: string;
    formdata?: any;
}


function ModalNotification({ message, status, isOpen, onRequestClose, email, password, formdata }: ModalNotificationProps) {


    let icon;
    let title;
    switch (status) {
        case 200:
            icon = "done";
            title = "זדול";
            break;
        case 500:
            icon = "error";
            title = "שגיאה";
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
                    <p>{message}</p>
                    {
                        status === 500 &&
                        <button onClick={onRequestClose} className="button-container">סגור</button>
                    }
                    {
                        status === 200 &&
                        <button onClick={() => signIn("credentials", { email: email, password: password, callbackUrl: "/dashboard/rsvp" })} className="button-container">sign in</button>}
                </article>

            </section>

        </Modal>
    );
}

export default ModalNotification;