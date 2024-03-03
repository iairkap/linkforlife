import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    refreshData: () => void;
    user: any;
}

interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    onRequestCloseGeneral: () => void;
}

function AddGroup({ isOpen, contentLabel, onRequestClose, refreshData, onRequestCloseGeneral, user }: AddInvProps) {

    const posibleNameEvent = user?.name + ' ' + "&" + " " + user?.partnerName

    const [weddingName, setWeddingName] = React.useState(posibleNameEvent);

    const t = useTranslations('AddWedding');


    const data = {
        weddingName: weddingName,

    }





    const handleWeddingaAddition = async () => {
        try {
            const wedding = {
                weddingName
            };

            const response = await axios.post('/api/wedding', wedding);
            refreshData();
            onRequestClose();
            onRequestCloseGeneral();

        } catch (error) {
            console.error('Failed to add invitation:', error);
        }
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} icon={"celebration"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>{t("addWedding")}</h1>
                <article className="layout">
                    <InputField
                        value={weddingName}
                        type="text"
                        placeholder={posibleNameEvent ? posibleNameEvent : t("name")}
                        onChange={(e) => setWeddingName(e.target.value)}
                        error=''
                    />
                    <Button label={t("save")} onClick={handleWeddingaAddition} className='button-a' />
                </article>
            </section>
        </Modal>
    );
}

export default AddGroup;