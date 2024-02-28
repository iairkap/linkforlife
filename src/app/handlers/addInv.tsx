import axios from "axios";


export const handleAddInv = async (wedding: any, name: string, lastName: string, email: string, invitedBy: string[], specialRole: string[], phoneNumber: string, selectedGroups: number[], otherValue: string, setUserInvitationList: any, userInvitationList: any, fetchData: any, onRequestClose: any, coupleName?: string, coupleLastName?: string, emailCouple?: string, phoneNumberCouple?: string, selectedGroupsCouple?: number[],) => {
    try {
        const family = Boolean(coupleName);
        const familyID = family ? Math.floor(Math.random() * 1000000) : null;

        console.log(coupleName, coupleLastName, emailCouple, phoneNumberCouple, selectedGroupsCouple)

        const invitation = {
            weddingId: wedding,
            name,
            lastName,
            emailInvitation: email,
            invitedBy,
            specialRole,
            phoneNumber,
            groups: selectedGroups.filter(group => typeof group === "number"),
            family,
            familyID
        };
        const invitations = [invitation];

        if (coupleName) {
            const coupleInvitation = {
                weddingId: wedding,
                name: coupleName,
                lastName: coupleLastName || '',
                emailInvitation: emailCouple || '',
                invitedBy,
                specialRole,
                phoneNumber: phoneNumberCouple || '',
                groups: selectedGroupsCouple?.filter(group => typeof group === "number") ?? [],
                family,
                familyID
            };
            invitations.push(coupleInvitation);
        }

        console.log(invitations)
        const newGroups = otherValue ? [otherValue] : [];
        const response = await axios.post('/api/invitationListGeneral', invitations);
        console.log(response)
        const invitationId = response.data[0].id;
        console.log('Invitation ID in handleAddInv:', invitationId); // Add this line

        if (newGroups.length > 0) {
            await axios.post('/api/createGroups', { groups: newGroups, weddingId: wedding, invitationId });
        }

        if (response.status === 201 || response.status === 500) {
            console.log(response.data)
            setUserInvitationList([...userInvitationList, ...response.data]);

            fetchData();
            onRequestClose();
        }
    } catch (error) {
        console.error('Failed to add invitation:', error);
        setUserInvitationList([...userInvitationList]);
        fetchData();
        onRequestClose();
    }
}