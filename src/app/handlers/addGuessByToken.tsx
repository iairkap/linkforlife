
import axios from "axios";
import { set } from "date-fns";

interface Invitation {
    name: string;
    lastName: string;
    emailInvitation: string;
    phoneNumber: string;
    weddingID: string | undefined;
    setIsOpen: (value: boolean) => void;

}
export const handleAddInvByToken = async (name: string, lastName: string, email: string, phoneNumber: string, weddingID: string | undefined, setIsOpen: (value: boolean) => void) => {
    const id = weddingID;
    try {
        const invitation = {
            name,
            lastName,
            emailInvitation: email,
            phoneNumber
        };

        const response = await axios.post(`/api/wedding/${id}`, invitation);


        if (response.status === 200) {
            ('Invitation added');
            return response.status;
        }
    } catch (error) {
        (error);
        console.error('Failed to add invitation:', error);
    }
    setIsOpen(true); // Move this line here
    return 500;
};