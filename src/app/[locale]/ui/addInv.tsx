import React from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';
import { useTranslations } from 'next-intl';
import { splitName } from '../utils/splitName';


interface AddInvProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
}

interface AddInvProps {
    user: any;
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    userInvitationList: any[]; // Add this line
    setUserInvitationList: (list: any[]) => void; // Add this line
}

function AddInv({ isOpen, contentLabel, onRequestClose, setUserInvitationList, userInvitationList, user }: AddInvProps) {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [invitedBy, setInvitedBy] = React.useState<string[]>([]);
    const [specialRole, setSpecialRole] = React.useState<string[]>([]);
    const [phoneNumber, setPhoneNumber] = React.useState('');

    console.log(user)
    const t = useTranslations('ModalAddInv');

    splitName(user.name)

    const wedding = userInvitationList[0]?.weddingId





    const { refreshData } = useDashboardData();
    const handleAddInv = async () => {
        try {
            const invitation = {
                weddingId: wedding,
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
                <h1 className='title-container'>{t("addInv")}</h1>
                <article className="layout">
                    <InputField
                        value={name}
                        type="text"
                        placeholder={t("name")}
                        onChange={(e) => setName(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={lastName}
                        type="text"
                        placeholder={t("lastName")}
                        onChange={(e) => setLastName(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={email}
                        type="text"
                        placeholder={t("email")}
                        onChange={(e) => setEmail(e.target.value)}
                        error=''
                    />
                    <InputField
                        value={phoneNumber}
                        type="text"
                        placeholder={t("phone")}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        error=''
                    />
                    <MultiSelect span={t("invitedBy")} value={invitedBy} onChange={setInvitedBy} options={[`${splitName(user.name)}`, `${user?.partnerName}`, `${splitName(user.name)
                        }'s family`, `${user?.partnerName}'s family`, `Both`]} id={t("invitedBy")} />
                    <MultiSelect span={t("specialRole")} value={specialRole} onChange={setSpecialRole} options={['Best Man', 'Maid Of Honor', 'Parent', 'None']} id={"specialRole"} />


                    <Button label={t("save")} onClick={handleAddInv} className='button-a' />
                </article>
            </section>
        </Modal>
    );
}

export default AddInv;