import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import axios from 'axios';
import { useTranslations } from 'next-intl';


interface modalGroupProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    onRequestCloseGeneral: () => void;

}


function ModalCredits({ isOpen, contentLabel, onRequestClose, onRequestCloseGeneral }: modalGroupProps) {
    const t = useTranslations('ModalCredits');


    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"clock_loader_90"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>{t("title")}</h1>
                <h4 className='subtitles-modal-credits'>{t("span")}</h4>
                <button className="button-a">Close</button>
            </section>
        </Modal>
    );
}

export default ModalCredits;