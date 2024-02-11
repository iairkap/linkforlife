import React, { useState } from 'react';
import DropDown from './dropDown';
import Image from 'next/image';
import "../sass/components/dropdown.scss"
import { signOut } from 'next-auth/react';
import { useGlobalContext } from '../dashboard/globalContext';
import { getListItems } from '../utils/listMenuDropdown';
interface User {
    name: string;
    email: string;
    image: string;

}


interface DropDownUserSettingsProps {
    isOpen: boolean;
    profilePicture: string;
    email: string;
    name: string;
    setIsOpen: (value: boolean) => void;

}

function DropDownUserSettings({ isOpen, setIsOpen, profilePicture, email, name }: DropDownUserSettingsProps): JSX.Element {

    const { isOpenModalAddUser, setIsOpenModalAddUser } = useGlobalContext() as { isOpenModalAddUser: boolean, setIsOpenModalAddUser: (value: boolean) => void };

    const listItems = getListItems(setIsOpenModalAddUser, setIsOpen, signOut);


    return (
        <DropDown isOpen={isOpen}>
            <article>
                <header className='header-dropDown'>
                    <div className='image-container'>
                        <Image src={profilePicture} width="70" height="70" alt='profile-picture' />
                    </div>
                    <div className='user-data-container'>
                        <h3 className='user-data-name'>{name}</h3>
                        <p className='user-data-email'>{email}</p>
                    </div>
                </header>
                <div className='line-divisor'></div>
                <section>
                    <ul>
                        {listItems.map((item, index) => (
                            <li key={index} onClick={item.onClick}>
                                <span className="material-symbols-outlined">{item.symbol}</span>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </article>
        </DropDown>
    );
}

export default DropDownUserSettings;