"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import InputField from '../ui/InputField';
import "../sass/pages/signup.scss"
import Image from 'next/image';
import SaveTheDateInitialSignUp from '../ui/saveTheDateInitialSignUp';
import backgroundSign from "../../../public/backC.jpeg"
import Button from '../ui/button';
import { signUp } from '../handlers/singUp';
import ModalNotification from '../ui/modalNotification';
import { signIn, getSession } from "next-auth/react";





interface SignUpResponse {
    message: string;
    status: string;
}

function SignUp() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [inputsAreEmpty, setInputsAreEmpty] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [partnersFirstName, setPartnersFirstName] = useState<string>("");
    const [partnersLastName, setPartnersLastName] = useState<string>("");
    const [weddingDate, setWeddingDate] = useState<string>("");
    const [weddingDateUnknown, setWeddingDateUnknown] = useState<boolean>(false);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string | undefined>();
    const [modalStatus, setModalStatus] = useState<string | undefined>();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        lastName: "",
        partnersFirstName: "",
        partnersLastName: "",
        weddingDate: "",
        weddingDateUnknown: false,
    });

    useEffect(() => {
        setFormData({
            email,
            password,
            passwordConfirmation,
            name,
            lastName,
            partnersFirstName,
            partnersLastName,
            weddingDate,
            weddingDateUnknown,
        });
    }, [email, password, passwordConfirmation, name, lastName, partnersFirstName, partnersLastName, weddingDate, weddingDateUnknown]);


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        // Limpiar los errores
        let newErrors: { [key: string]: string } = {};

        if (!name) newErrors.name = 'נדרש שם';
        if (!lastName) newErrors.lastName = 'נדרש שם משפחה';
        if (!partnersFirstName) newErrors.partnersFirstName = 'נדרש שם השותף/ת';
        if (!partnersLastName) newErrors.partnersLastName = 'נדרש שם משפחה של השותף/ת';
        if (!weddingDate && !weddingDateUnknown) newErrors.weddingDate = 'נדרש תאריך חתונה';
        if (!email) newErrors.email = 'נדרש דוא"ל';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'הדוא"ל אינו תקף';
        if (!password) newErrors.password = 'נדרש סיסמה';
        if (password !== passwordConfirmation) newErrors.passwordConfirmation = 'הסיסמאות לא תואמות';
        setErrors(newErrors);

        const errorValues = Object.values(newErrors);
        const hasErrors = errorValues.some(error => error !== "");

        if (hasErrors) {
            return;
        }
        setFormSubmitted(true);
        const response = await signUp(formData);
        setModalMessage(response.message);

        setModalStatus(response.status as undefined);
        setModalIsOpen(true);
        if (response.status === 200) {
            const session = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                callbackUrl: "/dashboard/rsvp",
            });
        }
    };
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        lastName: "",
        partnersFirstName: "",
        partnersLastName: "",
        weddingDate: "",
    });



    useEffect(() => {
        if (name && lastName && partnersFirstName && partnersLastName && (weddingDate || weddingDateUnknown)) {
            setInputsAreEmpty(false);
        } else {
            setInputsAreEmpty(true);
        }
    }, [name, lastName, partnersFirstName, partnersLastName, weddingDate, weddingDateUnknown]);




    useEffect(() => {
        if (formSubmitted) {

            let newErrors = { ...errors };
            if (!name) newErrors.name = 'Name is required';
            if (!lastName) newErrors.lastName = 'Last name is required';
            if (!partnersFirstName) newErrors.partnersFirstName = 'Partner\'s first name is required';
            if (!partnersLastName) newErrors.partnersLastName = 'Partner\'s last name is required';
            if (!weddingDate && !weddingDateUnknown) newErrors.weddingDate = 'Wedding date is required';
            if (!email) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is not valid';
            if (!password) newErrors.password = 'Password is required';
            if (password !== passwordConfirmation) newErrors.passwordConfirmation = 'Passwords do not match';

            setErrors(newErrors);
        }
    }, [name, lastName, partnersFirstName, partnersLastName, weddingDate, weddingDateUnknown, email, password, passwordConfirmation]);


    const nextPage = () => {
        if (currentPage === 1 && inputsAreEmpty) {
            return;
        }
        setCurrentPage(currentPage + 1);
    }; const prevPage = () => setCurrentPage(currentPage - 1);






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
                        <SaveTheDateInitialSignUp
                            name={name}
                            partnerName={partnersFirstName}
                            date={weddingDate}
                        />
                    }
                </div>
            </section>
            <section className='form'>
                <h1>ליצור חשבון</h1>
                <div className="pagination">
                    <p className={currentPage === 1 ? 'active' : 'deactive'}>1</p>
                    <div className='line'></div>

                    <p className={currentPage === 2 ? 'active' : 'deactive'}>2</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {currentPage === 1 && (
                        <div className='container-pos'>
                            <div className='container-input'>
                                <InputField value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder='שם' error={errors.name} />
                                <InputField value={lastName} type="text" onChange={(e) => setLastName(e.target.value)} placeholder='שם משפחה ' error={errors.lastName} />
                                <InputField value={partnersFirstName} type="text" onChange={(e) => setPartnersFirstName(e.target.value)} placeholder='שם השותף/ה ' error={errors.partnersFirstName} />
                                <InputField value={partnersLastName} type="text" onChange={(e) => setPartnersLastName(e.target.value)} placeholder='שם משפחה של השותף/ה' error={errors.partnersLastName} />
                                <InputField
                                    value={weddingDate}
                                    type={weddingDateUnknown ? "text" : (weddingDate ? "date" : "text")}
                                    placeholder='תאריך חתונה'
                                    onFocus={(e) => {
                                        if (!weddingDateUnknown) {
                                            e.currentTarget.type = 'date';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (!e.currentTarget.value) {
                                            e.currentTarget.type = 'text';
                                        }
                                    }}
                                    onChange={(e) => setWeddingDate(e.target.value)}
                                    error={errors.weddingDate}
                                    disabled={weddingDateUnknown}
                                />
                                <div>

                                    <label className='checkbox'>
                                        <input
                                            type="checkbox"
                                            checked={weddingDateUnknown}
                                            onChange={e => setWeddingDateUnknown(e.target.checked)}
                                            style={{ display: 'none' }}
                                        />
                                        <span className={weddingDateUnknown ? 'checkbox-custom checked' : 'checkbox-custom'}></span>
                                        אנחנו לא יודעים
                                    </label>
                                </div>
                                <div className='container-comment'>
                                    <span>כל השדות נדרשים  </span>
                                </div>
                            </div>
                            <Button label='הבא' onClick={nextPage} className={inputsAreEmpty ? 'button-a-disabled' : 'button-a'} disabled={currentPage === 1 && inputsAreEmpty} />                        </div>
                    )}
                    {currentPage === 2 && (
                        <>
                            <div className='container-inputB'>
                                <InputField value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder='אמייל' error={errors.email} />
                                <InputField value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder='סיסמה' error={errors.password} />
                                <InputField value={passwordConfirmation} type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder='אשר סיסמה' error={errors.passwordConfirmation} />
                            </div>
                            <button onClick={() => { setCurrentPage(1) }}>back</button>
                            <Button label='הרשם' onClick={handleSubmit} className={inputsAreEmpty ? 'button-a-disabled' : 'button-a'} disabled={inputsAreEmpty} />

                        </>


                    )}


                </form>
                <ModalNotification message={modalMessage} status={modalStatus} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
            </section>
        </main >
    );
}

export default SignUp;