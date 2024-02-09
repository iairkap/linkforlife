import React from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';


interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}

interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    setUserInvitationList: (list: any[]) => void; // Add this line
}

function AddInv({ isOpen, contentLabel, onRequestClose, setUserInvitationList }: AddInvProps) {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [invitedBy, setInvitedBy] = React.useState<string[]>([]);
    const [specialRole, setSpecialRole] = React.useState<string[]>([]);
    const [phoneNumber, setPhoneNumber] = React.useState('');


    const data = {
        name: name,
        lastName: lastName,
        email: email,
        invitedBy: invitedBy,
        specialRole: specialRole,
        phoneNumber: phoneNumber
    }




    const { userInvitationList } = useDashboardData(); // 


    const { refreshData } = useDashboardData();
    const handleAddInv = async () => {
        try {
            const invitation = {
                name,
                lastName,
                emailInvitation: email,
                invitedBy,
                specialRole,
                phoneNumber
            };

            const response = await axios.post('/api/invitationListGeneral', invitation);

            if (response.status === 200) {
                setUserInvitationList([...userInvitationList, invitation]);
                refreshData();
                onRequestClose();
            }
        } catch (error) {
            console.error('Failed to add invitation:', error);
        }
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} icon={"person_add"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>להוסיף אורח</h1>
                <article className="layout">
                    <InputField
                        value={name}
                        type="text"
                        placeholder='שם'
                        onChange={(e) => setName(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={lastName}
                        type="text"
                        placeholder='שם משפחה'
                        onChange={(e) => setLastName(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={email}
                        type="text"
                        placeholder='אמייל'
                        onChange={(e) => setEmail(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={phoneNumber}
                        type="text"
                        placeholder='טלפון'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        error=''
                    />
                    <MultiSelect span="הוזמן על ידי" value={invitedBy} onChange={setInvitedBy} options={['Groom', 'Bride', 'Grooms Family', 'Brides Family']} id={"הוזמן על ידי"} />
                    <MultiSelect span="תפקיד מיוחד" value={specialRole} onChange={setSpecialRole} options={['Best Man', 'Maid Of Honor', 'Parent', 'None']} id={"specialRole"} />


                    <Button label='שמור והוסף לרשימה' onClick={handleAddInv} className='button-a' />
                </article>
            </section>
        </Modal>
    );
}

export default AddInv;