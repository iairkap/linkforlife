

import React from 'react';
import InputField from './InputField';
import MultipleSelectChip from './multiSelectorMaterialUI';
import { MuiPhone } from './phoneInput';
import "../sass/layout/modalContent.scss"



function AddInvOnePerson({ name, setName, lastName, setLastName, email, setEmail, phoneNumber, setPhoneNumber, groups, selectedGroups, setSelectedGroups, otherValue, setOtherValue, t }: any) {
    return (
        <div>
            <span>Single Guest</span>
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
                {selectedGroups.includes(groups.find((group: any) => group.name === 'other')?.id) &&
                    <InputField
                        value={otherValue}
                        type="text"
                        placeholder={t("other")}
                        onChange={(e) => setOtherValue(e.target.value)}
                        error=''
                    />
                }
            </article>
        </div>
    );
}

export default AddInvOnePerson;