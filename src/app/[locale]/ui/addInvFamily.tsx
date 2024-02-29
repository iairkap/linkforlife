

import React from 'react';
import InputField from './InputField';
import MultipleSelectChip from './multiSelectorMaterialUI';
import AddInvCouple from './addInvCouple';
import "../sass/layout/modalContent.scss"
import SingleSelect from './singleSelect';


function AddInvFamily({ name, coupleName, setCoupleName, setName, lastName, setLastName, coupleLastName, setCoupleLastName, email, emailCouple, setEmailCouple, setEmail, phoneNumber, setPhoneNumber, phoneNumberCouple, setPhoneNumberCouple, groups, selectedGroups, setSelectedGroups, otherValue, setOtherValue, setNames, names, t, selectedGroupsCouple, setSelectedGroupsCouple, childName, setChildName, childLastName, setChildLastName, childsName, setChildsName, childsLastName, setChildsLastName, childSelectedGroups, setChildSelectedGroups, childsSelectedGroups, setChildsSelectedGroups, addChildren, children, setChildren, invitedByOptions, invitedBy, setInvitedBy, invitedByCouple, setInvitedByCouple, invitedByChild, invitedByChilds, sertInvitedByChild, setInvitedByChilds }: any) {

    const handleAddChildren = () => {
        setChildren((prevChildren: any[]): any => [...prevChildren, { name: childName, lastName: childLastName, selectedGroups: childSelectedGroups, invitedBy: invitedByChild }]);
        setChildName('');
        setChildLastName('');
        setChildSelectedGroups([]);
    };
    return (
        <article className='family-container'>
            <AddInvCouple name={name}
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
                invitedBy={invitedBy}
                setInvitedBy={setInvitedBy}
                invitedByCouple={invitedByCouple}
                setInvitedByCouple={setInvitedByCouple}
                invitedByOptions={invitedByOptions}

            />
            <br />

            <article >
                <span className='guess-span child'>Child:</span>
                {children.map((child: any, index: number) => (
                    <article key={index} className="layoutModalAddInv modalChild">
                        <InputField
                            value={child.name}
                            type="text"
                            placeholder={t("name")}
                            onChange={(e) => {
                                const newChildren = [...children];
                                newChildren[index].name = e.target.value;
                                setChildren(newChildren);
                            }}
                            error=''
                        />
                        <InputField
                            value={child.lastName}
                            type="text"
                            placeholder={t("lastName")}
                            onChange={(e) => {
                                const newChildren = [...children];
                                newChildren[index].lastName = e.target.value;
                                setChildren(newChildren);
                            }}
                            error=''
                        />
                        <MultipleSelectChip
                            valueselct={groups}
                            selectedValueSelector={child.selectedGroups}
                            setSelectedValueSelector={(selectedGroups: string[]) => {
                                const newChildren = [...children];
                                newChildren[index].selectedGroups = selectedGroups;
                                setChildren(newChildren);
                            }}
                            otherValue={otherValue}
                        />
                        <SingleSelect
                            valueSelect={invitedByOptions}
                            selectedValueSelector={child.invitedBy}
                            setSelectedValueSelector={(value: string) => {
                                const newChildren = [...children];
                                newChildren[index].invitedBy = value;
                                setChildren(newChildren);
                            }}
                            otherValue={otherValue}
                            label={t("invitedBy")}
                        />
                    </article>
                ))}
                <div className='add-other-children'>
                    <button onClick={handleAddChildren} className='button-add-children'><span className='plus'>+</span>Add other Children</button>
                </div>
            </article >


        </article >


    );
}

export default AddInvFamily;