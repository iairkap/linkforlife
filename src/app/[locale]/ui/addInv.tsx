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
import AddInvCouple from './addInvCouple';
import { handleAddInv } from '@/app/handlers/addInv';
import { handleClickSwitch } from '@/app/handlers/clickAddInvChangeCouple';
import ButtonHeaderModal from './buttonHeaderContainerModalAddInv';
import AddInvFamily from './addInvFamily';


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
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [coupleName, setCoupleName] = useState<string>('');
    const [coupleLastName, setCoupleLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailCouple, setEmailCouple] = useState<string>('');
    const [invitedBy, setInvitedBy] = useState<string[]>([]);
    const [specialRole, setSpecialRole] = useState<string[]>([]);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [phoneNumberCouple, setPhoneNumberCouple] = useState<string>('');
    const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
    const [selectedGroupsCouple, setSelectedGroupsCouple] = useState<number[]>([]);
    const [otherValue, setOtherValue] = useState('');
    const [plusOne, setPluseOne] = useState(false);
    const [family, setFamily] = useState(false);
    const t = useTranslations('ModalAddInv');
    const [addInvOnePerson, setAddInvOnePerson] = useState(true);
    const [addInvCouple, setAddInvCouple] = useState(false);
    const [addInvFamily, setAddInvFamily] = useState(false);
    const [names, setNames] = useState<string[]>([]);
    const [emails, setEmails] = useState<string[]>([]);
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
    const [childName, setChildName] = useState<string>('');
    const [childLastName, setChildLastName] = useState<string>('');
    const [childsName, setChildsName] = useState<string[]>([]);
    const [childsLastName, setChildsLastName] = useState<string[]>([]);
    const [childSelectedGroups, setChildSelectedGroups] = useState<number[]>([]);
    const [childsSelectedGroups, setChildsSelectedGroups] = useState<number[]>([]);
    const [addChildren, setAddChilder] = useState<boolean>(false);
    const [children, setChildren] = useState([{ name: '', lastName: '', selectedGroups: [] }]);
    const wedding = user.weddings[0]?.id


    const { fetchData, isLoading, setIsLoading, } = useDashboardData();

    console.log(childName)
    console.log(children)
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} icon={"person_add"}>
            <section className='containerModalInvitationWedding'>
                <h1 className='title-container'>{t("addInv")}</h1>

                <ButtonHeaderModal t={t} handleClickSwitch={handleClickSwitch} setAddInvCouple={setAddInvCouple} setAddInvFamily={setAddInvFamily} setAddInvOnePerson={setAddInvOnePerson} />
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
                {
                    addInvCouple &&
                    <AddInvCouple
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
                        emailCouple={emailCouple}
                        setEmailCouple={setEmailCouple}
                        setNames={setNames}
                        coupleName={coupleName}
                        setCoupleName={setCoupleName}
                        coupleLastName={coupleLastName}
                        setCoupleLastName={setCoupleLastName}
                        phoneNumberCouple={phoneNumberCouple}
                        setPhoneNumberCouple={setPhoneNumberCouple}
                        names={names}
                        selectedGroupsCouple={selectedGroupsCouple}
                        setSelectedGroupsCouple={setSelectedGroupsCouple}
                    />
                }
                {
                    addInvFamily &&
                    <AddInvFamily
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
                        emailCouple={emailCouple}
                        setEmailCouple={setEmailCouple}
                        setNames={setNames}
                        coupleName={coupleName}
                        setCoupleName={setCoupleName}
                        coupleLastName={coupleLastName}
                        setCoupleLastName={setCoupleLastName}
                        phoneNumberCouple={phoneNumberCouple}
                        setPhoneNumberCouple={setPhoneNumberCouple}
                        names={names}
                        selectedGroupsCouple={selectedGroupsCouple}
                        setSelectedGroupsCouple={setSelectedGroupsCouple}
                        childName={childName}
                        setChildName={setChildName}
                        childLastName={childLastName}
                        setChildLastName={setChildLastName}
                        childsName={childsName}
                        setChildsName={setChildsName}
                        childsLastName={childsLastName}
                        setChildsLastName={setChildsLastName}
                        childSelectedGroups={childSelectedGroups}
                        setChildSelectedGroups={setChildSelectedGroups}
                        childsSelectedGroups={childsSelectedGroups}
                        setChildsSelectedGroups={setChildsSelectedGroups}
                        addChildren={addChildren}
                        children={children}
                        setChildren={setChildren}
                    />
                }
                <Button label={t("save")} onClick={() => handleAddInv(wedding, name, lastName, email, invitedBy, specialRole, phoneNumber, selectedGroups, otherValue, setUserInvitationList, userInvitationList, fetchData, onRequestClose, coupleName, coupleLastName, emailCouple, phoneNumberCouple, selectedGroupsCouple, childName, childLastName, childsName, childsLastName, childSelectedGroups, childsSelectedGroups, children)} className='button-a' />
            </section>
        </Modal >
    );
}

export default AddInv;

