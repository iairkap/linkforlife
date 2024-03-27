

import React from 'react';
import InputField from './InputField';
import MultipleSelectChip from './multiSelectorMaterialUI';
import { MuiPhone } from './phoneInput';
import "../sass/layout/modalContent.scss"
import SingleSelect from './singleSelect';


function AddInvCouple({ name, coupleName, setCoupleName, setName, lastName, setLastName, coupleLastName, setCoupleLastName, email, emailCouple, setEmailCouple, setEmail, phoneNumber, setPhoneNumber, phoneNumberCouple, setPhoneNumberCouple, groups, selectedGroups, setSelectedGroups, otherValue, setOtherValue, setNames, names, t, selectedGroupsCouple, setSelectedGroupsCouple, invitedByOptions, invitedBy, setInvitedBy, invitedByCouple, setInvitedByCouple }: any) {
    return (
        <div className='couple-modal-container'>
            <span className='guess-span'>{t("guest")} 1:</span>
            <article className="layoutModalAddInv">
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
                <MuiPhone
                    value={phoneNumber}
                    onChange={(e: any) => setPhoneNumber(e)}
                />
                <MultipleSelectChip
                    valueselct={groups}
                    selectedValueSelector={selectedGroups}
                    setSelectedValueSelector={setSelectedGroups}
                    otherValue={otherValue}

                />
                <SingleSelect
                    valueSelect={invitedByOptions}
                    selectedValueSelector={invitedBy}
                    setSelectedValueSelector={setInvitedBy}
                    otherValue={otherValue}
                    label={t("invitedBy")}
                />
            </article>
            <span className='guess-span'>{t("guest")} 2:</span>
            <article className="layoutModalAddInv">
                <InputField
                    value={coupleName}
                    type="text"
                    placeholder={t("name")}
                    onChange={(e) => setCoupleName(e.target.value)}
                    error=''
                />
                <InputField
                    value={coupleLastName}
                    type="text"
                    placeholder={t("lastName")}
                    onChange={(e) => setCoupleLastName(e.target.value)}
                    error=''
                />

                <InputField
                    value={emailCouple}
                    type="text"
                    placeholder={t("email")}
                    onChange={(e) => setEmailCouple(e.target.value)}
                    error=''
                />
                <MuiPhone
                    value={phoneNumberCouple}
                    onChange={(e: any) => setPhoneNumberCouple(e)}
                />


                <MultipleSelectChip
                    valueselct={groups}
                    selectedValueSelector={selectedGroupsCouple}
                    setSelectedValueSelector={setSelectedGroupsCouple}
                    otherValue={otherValue}

                />
                <SingleSelect
                    valueSelect={invitedByOptions}
                    selectedValueSelector={invitedByCouple}
                    setSelectedValueSelector={setInvitedByCouple}
                    otherValue={otherValue}
                    label={t("invitedBy")}
                />
            </article>

        </div>
    );
}

export default AddInvCouple;