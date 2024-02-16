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


interface SignUpResponse {
    message: string;
    status: string;
}


function SignUp() {

    const [formDataBis, setFormData] = useState({
        currentPage: 1,
        inputsAreEmpty: true,
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        lastName: "",
        partnerName: "",
        partnerLastName: "",
        weddingDate: "",
        weddingDateUnknown: false,
        formSubmitted: false,
        modalIsOpen: false,
        modalMessage: "",
        modalStatus: 200,
        isGoogleSignUp: false,
        isNormalSignUp: false,
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        lastName: "",
        partnerName: "",
        partnerLastName: "",
        weddingDate: "",
    });

    const updateFormData = (field, value) => {
        return new Promise(resolve => {
            setFormData(prevState => {
                const newState = { ...prevState, [field]: value };
                resolve(newState);
                return newState;
            });
        });
    };


    console.log(formDataBis.modalMessage)

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!formDataBis.name) newErrors.name = 'נדרש שם';
        if (!formDataBis.lastName) newErrors.lastName = 'נדרש שם משפחה';
        if (!formDataBis.partnerName) newErrors.partnerName = 'נדרש שם השותף/ת';
        if (!formDataBis.partnerLastName) newErrors.partnerLastName = 'נדרש שם משפחה של השותף/ת';
        if (!formDataBis.weddingDate && !formDataBis.weddingDateUnknown) newErrors.weddingDate = 'נדרש תאריך חתונה';
        if (!formDataBis.email) newErrors.email = 'נדרש דוא"ל';
        else if (!/\S+@\S+\.\S+/.test(formDataBis.email)) newErrors.email = 'הדוא"ל אינו תקף';
        if (!formDataBis.password) newErrors.password = 'נדרש סיסמה';
        if (formDataBis.password !== formDataBis.passwordConfirmation) newErrors.passwordConfirmation = 'הסיסמאות לא תואמות';

        const errorValues = Object.values(newErrors);
        const hasErrors = errorValues.some(error => error !== "");

        if (hasErrors) {
            setErrors(newErrors);
        }

        return !hasErrors;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        await updateFormData("isNormalSignUp", true);
        await updateFormData('formSubmitted', true);
        const response = await signUp(formDataBis);
        await updateFormData('modalMessage', response.message);
        console.log(response.message)
        await updateFormData('modalStatus', typeof response.status === 'number' ? response.status : undefined);
        await updateFormData('modalIsOpen', true);
    };

    useEffect(() => {
        if (formDataBis.name && formDataBis.lastName && formDataBis.partnerName && formDataBis.partnerLastName && (formDataBis.weddingDate || formDataBis.weddingDateUnknown)) {
            setFormData({ ...formDataBis, inputsAreEmpty: false });
        } else {
            setFormData({ ...formDataBis, inputsAreEmpty: true });
        }
    }, [formDataBis.name, formDataBis.lastName, formDataBis.partnerName, formDataBis.partnerLastName, formDataBis.weddingDate, formDataBis.weddingDateUnknown]);

    const nextPage = () => {
        if (formDataBis.currentPage === 1 && formDataBis.inputsAreEmpty) {
            return;
        }
        setFormData({ ...formDataBis, currentPage: formDataBis.currentPage + 1 });
    };

    const prevPage = () => setFormData({ ...formDataBis, currentPage: formDataBis.currentPage - 1 });

    const { data: session } = useSession()


    const handleGoogleSignUp = async () => {
        setErrors({
            ...errors,
            email: "",
            password: "",
            passwordConfirmation: "",
        });
        await updateFormData("isGoogleSignUp", true);
        await updateFormData('formSubmitted', true);
        signIn("google");
    }

    console.log(formDataBis)

    useEffect(() => {
        console.log(formDataBis)
        const checkSession = async () => {
            const session = await getSession();
            if (session) {
                try {
                    console.log(formDataBis)
                    const response = await axios.post('/api/signingoogle', formDataBis, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = response.data;
                    console.log(data);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        checkSession();
    }, [formDataBis]);
    /* 
    useEffect(() => {
    
        if (isGoogleSignUp) {
            const formDataBis = JSON.parse(localStorage.getItem('formDataBis') as string);
            setTimeout(() => {
                signUpWithGoogle(formDataBis);
                console.log('signUpWithGoogle called with data:', formDataBis);
                setIsGoogleSignUp(false); // Reset the flag
            }, 2000);
        }
    }, [session, isGoogleSignUp]);}} */

    return (
        <main className='main-container' dir='rtl'>
            <section className='pictureContainer'>
                <div className='overflow-picture-container'>
                    {
                        formDataBis.currentPage === 1 &&
                        <Image
                            src={backgroundSign}
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="cover"
                        />
                    }
                    {
                        formDataBis.currentPage === 2 &&
                        <SaveTheDateInitialSignUp
                            name={formDataBis.name}
                            partnerName={formDataBis.partnerName}
                            date={formDataBis.weddingDate}
                        />
                    }
                </div>
            </section>
            <section className='form'>
                <h1>ליצור חשבון</h1>
                <div className="pagination">
                    <p className={formDataBis.currentPage === 1 ? 'active' : 'deactive'}>1</p>
                    <div className='line'></div>

                    <p className={formDataBis.currentPage === 2 ? 'active' : 'deactive'}>2</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {formDataBis.currentPage === 1 && (
                        <div className='container-pos'>
                            <div className='container-input'>
                                <InputField value={formDataBis.name} type="text" onChange={(e) => updateFormData('name', e.target.value)} placeholder='שם' error={errors.name} />
                                <InputField value={formDataBis.lastName} type="text" onChange={(e) => updateFormData("lastName", e.target.value)} placeholder='שם משפחה ' error={errors.lastName} />
                                <InputField value={formDataBis.partnerName} type="text" onChange={(e) => updateFormData("partnerName", e.target.value)} placeholder='שם השותף/ה ' error={errors.partnerName} />
                                <InputField value={formDataBis.partnerLastName} type="text" onChange={(e) => updateFormData("partnerLastName", e.target.value)} placeholder='שם משפחה של השותף/ה' error={errors.partnerLastName} />
                                <InputField
                                    value={formDataBis.weddingDate}
                                    type={formDataBis.weddingDateUnknown ? "text" : (formDataBis.weddingDate ? "date" : "text")}
                                    onChange={(e) => updateFormData("weddingDate", e.target.value)}
                                    error={errors.weddingDate}
                                    disabled={formDataBis.weddingDateUnknown}
                                    placeholder='תאריך חתונה'
                                />
                                <div>

                                    <label className='checkbox'>
                                        <input

                                            type="checkbox"
                                            checked={formDataBis.weddingDateUnknown}
                                            onChange={e => updateFormData("weddingDateUnknown", e.target.checked)}
                                            style={{ display: 'none' }}
                                        />
                                        <span className={formDataBis.weddingDateUnknown ? 'checkbox-custom checked' : 'checkbox-custom'}></span>
                                        אנחנו לא יודעים
                                    </label>
                                </div>
                                <div className='container-comment'>
                                    <span>כל השדות נדרשים  </span>
                                </div>
                            </div>
                            <Button label='הבא' onClick={nextPage} className={formDataBis.inputsAreEmpty ? 'button-a-disabled' : 'button-a'} disabled={formDataBis.currentPage === 1 && formDataBis.inputsAreEmpty} />                        </div>
                    )}
                    {formDataBis.currentPage === 2 && (
                        <>
                            <button onClick={() => { updateFormData("currentPage", 1) }}>back</button>
                            <div className='container-inputB'>
                                <InputField value={formDataBis.email} type="email" onChange={(e) => updateFormData("email", e.target.value)} placeholder='אמייל' error={errors.email} />
                                <InputField value={formDataBis.password} type="password" onChange={(e) => updateFormData("password", e.target.value)} placeholder='סיסמה' error={errors.password} />
                                <InputField value={formDataBis.passwordConfirmation} type="password" onChange={(e) => updateFormData("passwordConfirmation", e.target.value)} placeholder='אשר סיסמה' error={errors.passwordConfirmation} />
                            </div>
                            <div className='button-container-sign-up'>
                                <Button
                                    label='הרשם'
                                    type="submit"
                                    className={formDataBis.inputsAreEmpty ? 'button-a-disabled' : 'button-a'}
                                    disabled={formDataBis.inputsAreEmpty}
                                />

                                {/*          <Button
                                    label='הרשם עם Google'
                                    onClick={handleGoogleSignUp}
                                    className={formDataBis.inputsAreEmpty ? 'button-a-disabled' : 'button-a'}
                                    disabled={formDataBis.inputsAreEmpty}
                                /> */}
                            </div>
                            <Button
                                label='  עם Google הרשם'
                                onClick={() => handleGoogleSignUp()}
                                className={formDataBis.inputsAreEmpty ? 'button-a-disabled' : 'button-a'}
                                disabled={formDataBis.inputsAreEmpty}
                            />

                        </>


                    )}


                </form>
                <ModalNotification
                    email={formDataBis.email}
                    password={formDataBis.password}
                    message={formDataBis.modalMessage}
                    status={formDataBis.modalStatus}
                    isOpen={formDataBis.modalIsOpen}
                    formdata={formDataBis}
                    onRequestClose={() => updateFormData("modalIsOpen", false)}
                />
            </section>
        </main >

    )
}


export default SignUp;






/*     useEffect(() => {
        if (formSubmitted) {
 
            let newErrors = { ...errors };
            if (!name) newErrors.name = 'Name is required';
            if (!lastName) newErrors.lastName = 'Last name is required';
            if (!partnerName) newErrors.partnerName = 'Partner\'s first name is required';
            if (!partnerLastName) newErrors.partnerLastName = 'Partner\'s last name is required';
            if (!weddingDate && !weddingDateUnknown) newErrors.weddingDate = 'Wedding date is required';
            if (!email) newErrors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is not valid';
            if (!password) newErrors.password = 'Password is required';
            if (password !== passwordConfirmation) newErrors.passwordConfirmation = 'Passwords do not match';
 
            setErrors(newErrors);
        }
    }, [name, lastName, partnerName, partnerLastName, weddingDate, weddingDateUnknown, email, password, passwordConfirmation]);
 */

/* "use client"

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
const [partnerName, setpartnerName] = useState<string>("");
const [partnerLastName, setpartnerLastName] = useState<string>("");
const [weddingDate, setWeddingDate] = useState<string>("");
const [weddingDateUnknown, setWeddingDateUnknown] = useState<boolean>(false);
const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
const [modalMessage, setModalMessage] = useState<string | undefined>();
const [modalStatus, setModalStatus] = useState<string | undefined>();
const [formDataBis, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    lastName: "",
    partnerName: "",
    partnerLastName: "",
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
        partnerName,
        partnerLastName,
        weddingDate,
        weddingDateUnknown,
    });
}, [email, password, passwordConfirmation, name, lastName, partnerName, partnerLastName, weddingDate, weddingDateUnknown]);


const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Limpiar los errores
    let newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = 'נדרש שם';
    if (!lastName) newErrors.lastName = 'נדרש שם משפחה';
    if (!partnerName) newErrors.partnerName = 'נדרש שם השותף/ת';
    if (!partnerLastName) newErrors.partnerLastName = 'נדרש שם משפחה של השותף/ת';
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
    const response = await signUp(formDataBis);
    setModalMessage(response.message);

    setModalStatus(response.status as undefined);
    setModalIsOpen(true);
    if (response.status === 200) {
        const session = await signIn("credentials", {
            email: formDataBis.email,
            password: formDataBis.password,
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
    partnerName: "",
    partnerLastName: "",
    weddingDate: "",
});



useEffect(() => {
    if (name && lastName && partnerName && partnerLastName && (weddingDate || weddingDateUnknown)) {
        setInputsAreEmpty(false);
    } else {
        setInputsAreEmpty(true);
    }
}, [name, lastName, partnerName, partnerLastName, weddingDate, weddingDateUnknown]);




useEffect(() => {
    if (formSubmitted) {

        let newErrors = { ...errors };
        if (!name) newErrors.name = 'Name is required';
        if (!lastName) newErrors.lastName = 'Last name is required';
        if (!partnerName) newErrors.partnerName = 'Partner\'s first name is required';
        if (!partnerLastName) newErrors.partnerLastName = 'Partner\'s last name is required';
        if (!weddingDate && !weddingDateUnknown) newErrors.weddingDate = 'Wedding date is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is not valid';
        if (!password) newErrors.password = 'Password is required';
        if (password !== passwordConfirmation) newErrors.passwordConfirmation = 'Passwords do not match';

        setErrors(newErrors);
    }
}, [name, lastName, partnerName, partnerLastName, weddingDate, weddingDateUnknown, email, password, passwordConfirmation]);


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
                        partnerName={partnerName}
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
                            <InputField value={partnerName} type="text" onChange={(e) => setpartnerName(e.target.value)} placeholder='שם השותף/ה ' error={errors.partnerName} />
                            <InputField value={partnerLastName} type="text" onChange={(e) => setpartnerLastName(e.target.value)} placeholder='שם משפחה של השותף/ה' error={errors.partnerLastName} />
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
*/