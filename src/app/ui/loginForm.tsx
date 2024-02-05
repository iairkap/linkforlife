"use client"
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import { useState } from 'react';
import Button from './button';
import { loginUser } from "../handlers/login"
import { useRouter } from 'next/navigation'
import "../sass/pages/login.scss"
import { signIn, getSession } from "next-auth/react";
import { useSession } from 'next-auth/react';




function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(''); // Nuevo estado para el error de email
    const [passwordError, setPasswordError] = useState(''); // Nuevo estado para el error de password

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const router = useRouter();





    return (
        <div className='container'>
            <div className='input-containerB'>
                <InputField value={email} type="text" onChange={handleUsernameChange} placeholder='אימייל' error={emailError} /> {/* Pasa el error de email como prop */}
                <InputField value={password} type="password" onChange={handlePasswordChange} placeholder='סיסמה' error={passwordError} /> {/* Pasa el error de password como prop */}

            </div>
            <div className='button-containerB'>
                <Button
                    label='התחבר'
                    onClick={() => {
                        signIn("credentials", {

                            email, password
                        }, { callbackUrl: "/dashboard" })
                    }}
                    className='button-a'
                />
                <Button label='התחבר עם Google' onClick={() => {
                    signIn("google", { callbackUrl: "/dashboard" });
                }} className='button-b' />
            </div>
            <div className='span-container'>
                <span>אין לך חשבון?<span> הירשם</span> </span>
                <span className='forget-password'>שכחת סיסמה?</span>
            </div>

        </div>
    );
}

export default LoginForm;

/*  
 */