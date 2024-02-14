interface WeddingUser {
    id: number;
    name: string;
    lastName: string;
    emailInvitation: string;
    createdAt: Date;
    updatedAt: Date;
    plusOne: boolean;
    userId: number;
    invitedBy: string[];
    specialRole: string[];
    isAttending: boolean;
    isConfirmed: boolean;
    plusOneConfirmed: boolean;
    groups: any[]; // Reemplaza 'any' con el tipo correcto
    groupId: number | null;
    Table: number | null;
    phoneNumber: string | null;
    weddingId: number;
}
interface Wedding {
    users: Array<WeddingUser>;
    // Agrega aquí cualquier otra propiedad que necesites
}

interface User {
    // Define tus campos aquí
    name: string;
    email: string;
    profilePicture: string;
    weddings: Array<any>; // Reemplaza 'any' con el tipo correcto
}

export const userExtractionData = (users: Array<User>) => {
    return users.flatMap(user => {
        const { name, email, profilePicture, weddings } = user;
        const weddingUsers = weddings[0]?.users;

        if (!weddingUsers) {
            return [];
        }

        return weddingUsers.map((weddingUser: WeddingUser) => ({
            name,
            email,
            profilePicture,
            weddingUserName: weddingUser.name,
        }));
    });
}