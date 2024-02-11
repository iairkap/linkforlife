import React from 'react';
import Modal from './modal';


interface ModalNotificationProps {
    message: string;
    status: number;
    isOpen: boolean;
    onRequestClose: () => void;
}


function ModalNotification({ message, status, isOpen, onRequestClose }: ModalNotificationProps) {


    console.log('ModalNotification', message, status, isOpen, onRequestClose)


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
                </article>

            </section>

        </Modal>
    );
}

export default ModalNotification;