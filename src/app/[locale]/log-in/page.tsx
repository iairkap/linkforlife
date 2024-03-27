"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import "../sass/pages/signup.scss"
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../utils/getLocale';
import LoginForm from '../ui/loginForm';
import { useTranslations } from 'next-intl';
import { signOut } from "next-auth/react";

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
    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName)
    const t = useTranslations("login");
    useEffect(() => {
        signOut();
    }, []);
    return (
        <main className='main-containerna' dir={extraction === "he" ? "rtl" : "ltr"}>
            <section className='pictureContainer'>
                <div className='overflow-picture-container'>
                    <Image
                        src="/welcomeBack.jpeg"
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

            </section>
            <section className='form'>
                <h2 className='title'>{t("welcomeBack")}</h2>
                <LoginForm t={t} />
            </section>
        </main >
    )
}

export default SignUp;





