


export const splitName = (name: string) => {
    const firstName = name?.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};
