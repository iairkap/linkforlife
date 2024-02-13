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
        const weddingUsers = weddings[0]?.users; // Asegúrate de manejar el caso en que 'weddings' o 'users' sea undefined

        if (!weddingUsers) {
            return [];
        }

        return weddingUsers.map(weddingUser => ({
            name,
            email,
            profilePicture,
            weddingUserName: weddingUser.name,
        }));
    });
}