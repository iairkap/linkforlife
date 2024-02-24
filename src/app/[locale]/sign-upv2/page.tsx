"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import InputField from '../ui/InputField';
import "../sass/pages/signup.scss"
import Image from 'next/image';
import SaveTheDateInitialSignUp from '../ui/saveTheDateInitialSignUp';
import backgroundSign from "../../../../public/backC.jpeg"
import Button from '../ui/button';
import { signUp, signUpWithGoogle } from '../../handlers/singUp';
import ModalNotification from '../ui/modalNotification';
import { signIn, getSession } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { update } from '@react-spring/web';
import axios from 'axios';
import SignUpPart1 from '../ui/signUpPart1';
import SignUpPart2 from '../ui/signUpPart2';
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../utils/getLocale';


interface SignUpFormData {
    email: string;
    password: string;
    passwordConfirmation: string;
}


interface SignUpResponse {
    message: string;
    status: string;
}


function SignUp() {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({});

    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName)


    const handleNext = (data: SignUpFormData) => {
        setFormData(prevData => ({ ...prevData, ...data }));
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleBack = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleSubmit = (data: { [key: string]: string }) => {
        setFormData(prevData => ({ ...prevData, ...data }));

    };



    return (
        <main className='main-container' dir={extraction === "he" ? "rtl" : "ltr"}>            <section className='pictureContainer'>
            <div className='overflow-picture-container'>
                {
                    currentPage === 1 &&
                    <Image
                        src={backgroundSign}
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                    />
                }
                {
                    currentPage === 2 &&
                    <Image
                        src={backgroundSign}
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                    />

                }
            </div>

        </section>
            <section className='form'>
                <h2 className='title'>Welcome!</h2>

                <div className='pagination'>
                    <div className={currentPage === 1 ? "activepag" : "deactivepag"}>
                        <span>1</span>
                    </div>

                    <div className={currentPage != 1 ? "activepag" : "deactivepag"}>
                        <span>2</span>
                    </div>
                </div>
                {currentPage === 1 ? (
                    <SignUpPart1 onNext={handleNext} />
                ) : (
                    <SignUpPart2 formDataEmail={formData} />
                )}
            </section>
        </main >
    )
}

export default SignUp;





