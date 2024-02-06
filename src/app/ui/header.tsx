"use client"

import React from 'react';
import "../sass/components/header.scss"
import { useSession } from 'next-auth/react'
import Image from 'next/image';


function Header({ }) {

    const { data: session } = useSession()
    const profilePicture = session?.user?.image ?? '';
    return (
        <div className='general'>
            <div className='image-container'>
                <Image src={profilePicture} width="100" height="100" alt='profile-picture' />
            </div>

        </div>
    );
}

export default Header;