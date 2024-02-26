"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/app/[locale]/ui/loader';
function InvitationId() {
    const pathName = usePathname();
    const invitationId = pathName?.split('/')[4]

    console.log(invitationId)


    return (
        <div>

        </div>
    );
}

export default InvitationId;