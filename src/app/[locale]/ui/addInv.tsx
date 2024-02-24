import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';
import { useTranslations } from 'next-intl';
import { splitName } from '../utils/splitName';
import MultipleSelectChip from './multiSelectorMaterialUI';
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
    const t = useTranslations('ModalAddInv');
    splitName(user?.name)


    const wedding = user.weddings[0]?.id



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
                <article className="layoutb">
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

                    <MultipleSelectChip
                        valueselct={groups}
                        selectedValueSelector={selectedGroups}
                        setSelectedValueSelector={setSelectedGroups}
                        otherValue={otherValue}

                    />
                    {selectedGroups.includes(groups.find((group: any) => group.name === 'other')?.id) &&
                        <InputField
                            value={otherValue}
                            type="text"
                            placeholder={t("other")}
                            onChange={(e) => setOtherValue(e.target.value)}
                            error=''
                        />
                    }
                    <Button label={t("save")} onClick={handleAddInv} className='button-a' />
                </article>
            </section>
        </Modal>
    );
}

export default AddInv;