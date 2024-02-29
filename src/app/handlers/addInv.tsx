import axios from "axios";


export const handleAddInv = async (wedding: any, name: string, lastName: string, email: string, invitedBy: string, specialRole: string[], phoneNumber: string, selectedGroups: number[], otherValue: string, setUserInvitationList: any, userInvitationList: any, fetchData: any, onRequestClose: any, coupleName?: string, coupleLastName?: string, emailCouple?: string, phoneNumberCouple?: string, selectedGroupsCouple?: number[], childName?: string, childLastName?: string, childsName?: string[], childsLastName?: string[], childSelectedGroups?: number[], childsSelectedGroups?: number[], children?: any, invitedByCouple?: any, setInvitedByCouple?: any) => {
    try {


        const family = Boolean(coupleName || childName);
        const familyID = family ? Math.floor(Math.random() * 1000000) : null;


        console.log(coupleName)
        console.log(children)

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

        if (coupleName !== "" && coupleName !== undefined) {
            const coupleInvitation = {
                weddingId: wedding,
                name: coupleName,
                lastName: coupleLastName || '',
                emailInvitation: emailCouple || '',
                invitedBy: invitedByCouple || '',
                specialRole,
                phoneNumber: phoneNumberCouple || '',
                groups: selectedGroupsCouple?.filter(group => typeof group === "number") ?? [],
                family,
                familyID
            };
            invitations.push(coupleInvitation);
        }
        if (children && children.some((child: any) => child.name)) {
            children.forEach((child: any) => {
                const childInvitation = {
                    weddingId: wedding,
                    name: child.name,
                    lastName: child.lastName || '',
                    emailInvitation: '',
                    invitedBy: child.invitedBy || '',
                    specialRole,
                    phoneNumber: '',
                    groups: child.selectedGroups?.filter((group: number) => typeof group === "number") ?? [],
                    family,
                    familyID
                };
                invitations.push(childInvitation);
            });
        }

        console.log(invitations)

        const newGroups = otherValue ? [otherValue] : [];
        const response = await axios.post('/api/invitationListGeneral', invitations);

        const invitationId = response.data[0].id;

        if (newGroups.length > 0) {
            await axios.post('/api/createGroups', { groups: newGroups, weddingId: wedding, invitationId });
        }

        if (response.status === 201 || response.status === 500) {
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