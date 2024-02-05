import React from 'react';
import Modal from './modal';
import InputField from './InputField';
import Selector from './Select';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';


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


    const { userInvitationList } = useDashboardData(); // 

    const { refreshData } = useDashboardData();
    const handleAddInv = async () => {
        try {
            const response = await axios.post('/api/invitationListGeneral', {
                name,
                lastName,
                emailInvitation: email,
                invitedBy,
                specialRole,
            });
            console.log('Calling refreshData');
            setUserInvitationList([...userInvitationList, response.data]);
            refreshData();
            console.log('refreshData called');

            onRequestClose();
        } catch (error) {
            console.error('Failed to add invitation:', error);
        }
    };
    return (
        <main >
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel}>
                <section className='main-general'>
                    <h1>Agregar Invitado</h1>
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
                            placeholder='apellido'
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
                        <Selector value={invitedBy} onChange={setInvitedBy} options={['Groom', 'Bride', 'GroomsFamily', 'BridesFamily']} id={"הוזמן על ידי"} />
                        <Selector value={specialRole} onChange={setSpecialRole} options={['BestMan', 'MaidOfHonor', 'Parent', 'none']} id={"specialRole"} />

                        <Button label='שמור' onClick={handleAddInv} className='button-a' />



                    </article>
                </section>
            </Modal>
        </main >
    );
}

export default AddInv;