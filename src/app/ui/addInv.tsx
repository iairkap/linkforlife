import React from 'react';
import Modal from './modal';
import InputField from './InputField';
import Selector from './Select';

interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}

function AddInv({ isOpen, contentLabel, onRequestClose }: AddInvProps) {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [invitedBy, setInvitedBy] = React.useState<string[]>([]);
    const [specialRole, setSpecialRole] = React.useState<string[]>([]);

    return (
        <div>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel}>
                <div>
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

                </div>
            </Modal>
        </div >
    );
}

export default AddInv;