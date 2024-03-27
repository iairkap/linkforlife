"use client"
import React, { useState } from 'react';
import InvitationCardContainer from '../../ui/invitationCardContainer';
import "../../sass/layout/invitationCardContainergrid.scss"
import { useInvitationData } from "../../helpers/useInvitationData"
import Loader from '../../ui/loader';
import ModalCredits from '../../ui/modalCredits';
import { useTranslations } from 'next-intl';

function InvitationPage() {

    const { invitationCards, isLoading, creditsData } = useInvitationData();
    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations('InvitationPage');

    if (isLoading) {
        return (<main className='main'>
            <Loader />
        </main>

        )
    }
    return (
        <main className='layout-card-container'>
            <button className='title-header' onClick={() => setIsOpen(true)}>{t("remainingCredits")}:{creditsData}</button>
            <InvitationCardContainer cards={invitationCards} credits={creditsData} t={t} />

            <ModalCredits isOpen={isOpen} contentLabel="Credits" onRequestClose={() => setIsOpen(false)} onRequestCloseGeneral={() => setIsOpen(false)} />

        </main>
    );
}

export default InvitationPage;