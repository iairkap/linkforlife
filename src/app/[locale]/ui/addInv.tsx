import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';
import { useTranslations } from 'next-intl';
import MultipleSelectChip from './multiSelectorMaterialUI';
import AddInvOnePerson from './addInvOnePerson';
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
    groups: any;
}

function AddInv({ isOpen, contentLabel, onRequestClose, setUserInvitationList, userInvitationList, user, groups }: AddInvProps) {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [invitedBy, setInvitedBy] = React.useState<string[]>([]);
    const [specialRole, setSpecialRole] = React.useState<string[]>([]);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [selectedGroups, setSelectedGroups] = React.useState<number[]>([]);
    const [otherValue, setOtherValue] = React.useState('');
    const [plusOne, setPluseOne] = useState(false);
    const [family, setFamily] = useState(false);
    const t = useTranslations('ModalAddInv');
    const [addInvOnePerson, setAddInvOnePerson] = useState(true);
    const [addInvCouple, setAddInvCouple] = useState(false);
    const [addInvFamily, setAddInvFamily] = useState(false);

    const handleClick = (type: any) => {
        switch (type) {
            case 'one':
                setAddInvOnePerson(true);
                setAddInvCouple(false);
                setAddInvFamily(false);
                break;
            case 'couple':
                setAddInvOnePerson(false);
                setAddInvCouple(true);
                setAddInvFamily(false);
                break;
            case 'family':
                setAddInvOnePerson(false);
                setAddInvCouple(false);
                setAddInvFamily(true);
                break;
            default:
                break;
        }
    };

    const wedding = user.weddings[0]?.id

    console.log(addInvFamily)
    console.log(addInvCouple)
    console.log(addInvOnePerson)

    console.log(selectedGroups)
    const { fetchData, isLoading, setIsLoading, } = useDashboardData();


    const handleAddInv = async () => {
        try {
            const invitation = {
                weddingId: wedding,
                name,
                lastName,
                emailInvitation: email,
                invitedBy,
                specialRole,
                phoneNumber,
                groups: selectedGroups.filter(group => typeof group === "number")
            };

            const newGroups = otherValue ? [otherValue] : [];
            const response = await axios.post('/api/invitationListGeneral', invitation);
            console.log(response)
            const invitationId = response.data[0].id;
            console.log('Invitation ID in handleAddInv:', invitationId); // Add this line

            if (newGroups.length > 0) {
                await axios.post('/api/createGroups', { groups: newGroups, weddingId: wedding, invitationId });
            }

            if (response.status === 201 || response.status === 500) {
                setUserInvitationList([...userInvitationList, invitation]);
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

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} icon={"person_add"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>{t("addInv")}</h1>
                <header>
                    <button onClick={() => handleClick('one')}>One Person</button>
                    <button onClick={() => handleClick('couple')}>Couple</button>
                    <button onClick={() => handleClick('family')}>Family</button>
                </header>
                {addInvOnePerson &&

                    <AddInvOnePerson
                        name={name}
                        setName={setName}
                        lastName={lastName}
                        setLastName={setLastName}
                        email={email}
                        setEmail={setEmail}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        groups={groups}
                        selectedGroups={selectedGroups}
                        setSelectedGroups={setSelectedGroups}
                        otherValue={otherValue}
                        setOtherValue={setOtherValue}
                        t={t}
                    />
                }
                <Button label={t("save")} onClick={handleAddInv} className='button-a' />
            </section>
        </Modal >
    );
}

export default AddInv;