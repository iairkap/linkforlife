"use client"
import React, { useState, useRef, useEffect } from 'react';
import "../sass/layout/header.scss"
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import SearchBar from './searchBar';
import DropDownUserSettings from './dropDownUserSettings';

function Header({ }) {
    const { data: session } = useSession()
    const [menuVisible, setMenuVisible] = useState(false)

    const menuRef = useRef(null);
    const profilePicture = session?.user?.image ?? '';
    const email = session?.user?.email ?? '';
    const name = session?.user?.name ?? '';

    // Close the menu when clicking outside
    useEffect(() => {
        function handleMouseDown(event: MouseEvent) {
            if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
                setMenuVisible(false);
            }
        }

        document.addEventListener('mousedown', handleMouseDown);

        // Clean up the event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const handleClickSetMenuVisibleInvisible = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <div className='general'>
            <div className='searchbar'>
                <SearchBar />
            </div>
            <div className='notificationCenter'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.857 17.082C16.7202 16.8614 18.5509 16.4217 20.311 15.772C18.8204 14.1208 17.9967 11.9745 18 9.75V9.05V9C18 7.4087 17.3678 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3C10.4087 3 8.88257 3.63214 7.75735 4.75736C6.63213 5.88258 5.99999 7.4087 5.99999 9V9.75C6.00301 11.9746 5.17898 14.121 3.68799 15.772C5.42099 16.412 7.24799 16.857 9.14299 17.082M14.857 17.082C12.959 17.3071 11.041 17.3071 9.14299 17.082M14.857 17.082C15.0011 17.5319 15.0369 18.0094 14.9616 18.4757C14.8862 18.942 14.7018 19.384 14.4234 19.7656C14.1449 20.1472 13.7803 20.4576 13.3592 20.6716C12.9381 20.8856 12.4724 20.9972 12 20.9972C11.5276 20.9972 11.0619 20.8856 10.6408 20.6716C10.2197 20.4576 9.85506 20.1472 9.57661 19.7656C9.29816 19.384 9.11375 18.942 9.0384 18.4757C8.96305 18.0094 8.99889 17.5319 9.14299 17.082" stroke="#5D6679" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div className='menu-container' ref={menuRef}>
                    <button onClick={() => { handleClickSetMenuVisibleInvisible() }}>
                        <div className='image-container'>
                            <Image src={profilePicture} width="50" height="50" alt='profile-picture' />
                        </div>
                    </button>
                    {
                        menuVisible &&
                        <DropDownUserSettings isOpen={menuVisible} profilePicture={profilePicture} email={email} name={name} setIsOpen={setMenuVisible} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;