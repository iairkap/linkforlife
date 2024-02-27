"use client"
import React from 'react';
import InvitationCardContainer from '../../ui/invitationCardContainer';
import "../../sass/layout/invitationCardContainergrid.scss"
import { useInvitationData } from "../../helpers/useInvitationData"
import Loader from '../../ui/loader';


function InvitationPage() {

    const { invitationCards, isLoading, creditsData } = useInvitationData();

    if (isLoading) {
        return (<main className='main'>
            <Loader />
        </main>

        )
    }
    return (
        <main className='layout-card-container'>
            <span className='title-header'>Remaining Credits:{creditsData}</span>
            <InvitationCardContainer cards={invitationCards} credits={creditsData} />
        </main>
    );
}

export default InvitationPage;