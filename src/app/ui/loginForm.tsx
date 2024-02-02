"use client"

import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import { useState } from 'react';
import Button from './button';
import { loginUser } from "../handlers/login"
import { useRouter } from 'next/navigation'
import "../sass/pages/login.scss"


function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            console.error('Login failed');
        }
    }

    return (
        <div className='container'>
            <InputField value={username} type="text" onChange={handleUsernameChange} placeholder='email' />
            <InputField value={password} type="password" onChange={handlePasswordChange} placeholder='pasword' />
            <Button label='Login' onClick={handleLoginClick} />
        </div>
    );
}

export default LoginForm;