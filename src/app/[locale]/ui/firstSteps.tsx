import React from 'react';
import ModalFistSteps from './modalFistSteps';
import { useState } from 'react';
import "../sass/components/FirstSteps.scss"
import AddWedding from './addWedding';
import AddUserCollaborator from './addUserToTheWeddingList';
import AccesTableWithToken from './accesTableWithToken';
import firstIcon from "../../../../public/firstIcon.svg"
import Image from 'next/image';
import Button from './button';
import { useTranslations } from 'next-intl';
interface FirstStepsProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    refreshData: () => void;
    user: any;

}

function FirstSteps({ isOpen, contentLabel, onRequestClose, refreshData, user }: FirstStepsProps) {


    const [isModalOpenCreateWedding, setIsModalOpenCreateWedding] = useState(false);
    const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
    const [isAccesTableWithTokenOpen, setIsAccesTableWithTokenOpen] = useState(false);


    const t = useTranslations("FirstSteps");

    return (
/*         <ModalFistSteps isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose}>
 */            <div className='container'>
            <Image src={firstIcon} alt="First Icon" />
            <h1 className='title'>{t("thereIsNotWedding")}</h1>
            <div className='buttoncito-container'>
                <button onClick={() => { setIsModalOpenCreateWedding(true) }} className='buttoncito'>{t("addWedding")}</button>
                <AddWedding isOpen={isModalOpenCreateWedding} contentLabel={t("addWedding")} onRequestClose={() => setIsModalOpenCreateWedding(false)} refreshData={refreshData} onRequestCloseGeneral={onRequestClose} user={user} />
                <button onClick={() => { setIsAccesTableWithTokenOpen(true) }} className='buttoncito'>{t("joinWedding")}</button>
                <AccesTableWithToken isOpen={isAccesTableWithTokenOpen} contentLabel="Join existent table" onRequestClose={() => setIsAccesTableWithTokenOpen(false)} />
            </div>

        </div>
    );
}

export default FirstSteps;