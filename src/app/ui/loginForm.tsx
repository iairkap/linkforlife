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



function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(''); // Nuevo estado para el error de email
    const [passwordError, setPasswordError] = useState(''); // Nuevo estado para el error de password

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const router = useRouter();

    const handleLoginClick = async () => {
        const data = await loginUser(username, password);
        if (data && data.token) {
            router.push('/dashboard');
        } else {
            if (data.error === 'No user found with this email.') {
                setEmailError(data.error);
            } else if (data.error === 'Incorrect password.') {
                setPasswordError(data.error);
            }
        }
    }

    return (
        <div className='container'>
            <div className='input-containerB'>
                <InputField value={username} type="text" onChange={handleUsernameChange} placeholder='אימייל' error={emailError} /> {/* Pasa el error de email como prop */}
                <InputField value={password} type="password" onChange={handlePasswordChange} placeholder='סיסמה' error={passwordError} /> {/* Pasa el error de password como prop */}

            </div>
            <div className='button-containerB'>
                <Button label='התחבר' onClick={handleLoginClick} className='button-a' />
                <Button label='התחבר עם Google' onClick={() => {
                    signIn("google", { callbackUrl: "https://localhost:3000/dashboard" });
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