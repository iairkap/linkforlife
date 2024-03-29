import React, { useState, ChangeEvent } from 'react';
import InputField from './InputField';
import Button from './button';
import { signIn, getSession } from "next-auth/react";
import Cookies from "js-cookie"
import CryptoJS from 'crypto-js';
import { useTranslations } from 'next-intl';
import ModalNotification from './modalNotification';
import { error } from 'console';
interface SignUpFormData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface Errors {
    email?: string;
    password?: string;
    passwordConfirmation?: string;
}

interface SignUpPart1Props {
    onNext: (data: SignUpFormData) => void;
}


const SignUpPart1: React.FC<SignUpPart1Props> = ({ onNext }) => {
    const [formData, setFormData] = useState<SignUpFormData>({
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [modalIsOpen, setIsOpen] = useState(false);
    const t = useTranslations("SignUp");
    const [modalError, setModalError] = useState<any>("");


    const validateForm = (): Errors => {
        const newErrors: Errors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        if (formData.password !== formData.passwordConfirmation) {
            newErrors.passwordConfirmation = "Passwords do not match";
        }

        return newErrors;
    }

    const updateFormData = (key: keyof SignUpFormData, value: string) => {
        setFormData(prevData => ({ ...prevData, [key]: value }));
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const errors = validateForm();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const encryptedPassword = CryptoJS.AES.encrypt(formData.password, "process.env.SECRET_KEY").toString();

            Cookies.set('tempPassword', encryptedPassword, { secure: true });
            try {
                const response = await fetch('/api/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.status === 444) {
                    setModalError("Email en uso");
                    setIsOpen(true);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Error al registrarse');
                }

                const data = await response.json();

                onNext(data);
            } catch (error: any) {
                console.error(error);
            }
        }
    }


    const handleGoogleSignIn = async () => {
        try {
            const data = await signIn("google", { callbackUrl: "/sign-up-step2" });

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <div className='container-inputB'>
                <InputField value={formData.email} type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormData("email", e.target.value)} placeholder={t("email")} error={errors.email} />
                <InputField value={formData.password} type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormData("password", e.target.value)} placeholder={t("password")} error={errors.password} />
                <InputField value={formData.passwordConfirmation} type="password" onChange={(e: ChangeEvent<HTMLInputElement>) => updateFormData("passwordConfirmation", e.target.value)} placeholder={t("confirmPassword")} error={errors.passwordConfirmation} />
            </div>
            <div className='button-container-sign-up'>
                <Button
                    label={t("signUp")}
                    onClick={handleSubmit}
                    className={formData.email && formData.password && formData.passwordConfirmation ? 'button-a' : 'button-a-disabled'}
                    disabled={!(formData.email && formData.password && formData.passwordConfirmation)}
                />
                <div className='google'>
                    <div className='linef' />
                    <span >{t("orSignInWithGoogle")}</span>
                    <div className='linef' />
                </div>
                <Button
                    label={t("signWithGoogle")}
                    type="submit"
                    className='button-b'
                    onClick={handleGoogleSignIn}
                />
            </div>
            <ModalNotification
                message={modalError}
                status={500}
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
            />
        </div>
    );
}


export default SignUpPart1;