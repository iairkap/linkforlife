"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/app/[locale]/ui/loader';
import { useInvitationData } from '@/app/[locale]/helpers/useInvitationData';
import FormInvitationCard from '@/app/[locale]/ui/formInvitationCard';
import "../../../sass/pages/invitationCardId.scss"
import Image from 'next/image';
import { useDashboardData } from '@/app/[locale]/helpers/useDashboardData';
import type { InvitationCard } from "../../../../../types/types"


function InvitationId() {
    const pathName = usePathname();
    const invitationId = Number(pathName?.split('/')[4]);
    const { invitationCard }: { invitationCard: InvitationCard | null } = useInvitationData(invitationId);
    const { creditsData } = useInvitationData();
    const { weddings, isLoading, user } = useDashboardData();




    if (isLoading) {
        return (
            <main className='main'>
                <Loader />
            </main>
        )
    }
    return (
        <main className='layout-invitation-card'>
            <section className='invitation-card-imagen-container'>
                {invitationCard &&
                    <Image src={invitationCard?.url ?? ''} alt="invitation card" layout='fill' objectFit='cover' />
                }
            </section>
            <article className='form-container'>
                <FormInvitationCard invitationCard={invitationCard} weddings={weddings} credits={creditsData} />
            </article>
        </main>
    );
}

export default InvitationId;