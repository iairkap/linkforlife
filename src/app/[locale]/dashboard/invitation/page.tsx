import React from 'react';
import InvitationCardContainer from '../../ui/InvitationCardContainer';
import { invitationPictureListTemplate } from "../../utils/invitationPictureList.tsx"

function InvitationPage() {
    return (
        <main >
            <InvitationCardContainer cards={invitationPictureListTemplate('en')} />
        </main>
    );
}

export default InvitationPage;