"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import InputField from '../ui/InputField';
import "../sass/pages/signup.scss"
import Image from 'next/image';
import SaveTheDateInitialSignUp from '../ui/saveTheDateInitialSignUp';
import backgroundSign from "../../../public/backC.jpeg"
import Button from '../ui/button';
import { signUp, signUpWithGoogle } from '../handlers/singUp';
import ModalNotification from '../ui/modalNotification';
import { signIn, getSession } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { update } from '@react-spring/web';
import axios from 'axios';
import SignUpPart1 from '../ui/signUpPart1';
import SignUpPart2 from '../ui/signUpPart2';



interface SignUpResponse {
    message: string;
    status: string;
}


function SignUp() {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({});

    console.log(formData)


    const handleNext = (data) => {
        setFormData(prevData => ({ ...prevData, ...data }));
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleBack = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleSubmit = (data) => {
        setFormData(prevData => ({ ...prevData, ...data }));

    };



    return (
        <main className='main-container' dir='rtl'>
            <section className='pictureContainer'>
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
                {currentPage === 1 ? (
                    <SignUpPart1 onNext={handleNext} />
                ) : (
                    <SignUpPart2 onBack={handleBack} onSubmit={handleSubmit} formDataEmail={formData} />
                )}
            </section>
        </main>
    )
}

export default SignUp;





