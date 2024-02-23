"use client"
import React, { useState } from 'react';
import InputField from './InputField';
import Button from './button';
import axios from 'axios';
import { formatISO } from 'date-fns';
import { roleOptionsEn, roleOptionsHe, roleOptionsEs } from './roleOptions';
import "../sass/components/selector.scss"
import { signIn } from 'next-auth/react';
import { usePathname } from '@/navigation';
import path from 'path';
import { sign } from 'crypto';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { useTranslations } from 'next-intl';
import { extractLocaleFromPathName } from '../utils/getLocale';
import { usePathname as usPathnameforExtraction } from 'next/navigation';

interface FormData {
    name: string;
    lastName: string;
    partnerName: string;
    partnerLastName: string;
    weddingDate: string;
    weddingDateUnknown: boolean;
    emailPartner?: string;
    emailPartnerDontRequired?: boolean;
    role?: string;
    partnerRole?: string;
}

interface Errors {
    name?: string;
    lastName?: string;
    partnerName?: string;
    partnerLastName?: string;
    weddingDate?: string;
    role?: string;
    partnerRole?: string;
}

interface SignUpPart2Props {
    formDataEmail?: any;
}

const SignUpPart2: React.FC<SignUpPart2Props> = ({ formDataEmail }) => {


    const t = useTranslations('SignUp');

    const [formData, setFormData] = useState<FormData>({
        name: "",
        lastName: "",
        partnerName: "",
        partnerLastName: "",
        role: "",
        partnerRole: "",
        weddingDate: "",
        weddingDateUnknown: false,
        emailPartner: "",
        emailPartnerDontRequired: true,
    });

    const pathName = usePathname();
    const router = useRouter();



    const pathNameForExtraction = usPathnameforExtraction()
    const extraction = extractLocaleFromPathName(pathNameForExtraction)
    const [errors, setErrors] = useState<Errors>({});

    const validateForm = (): Errors => {
        const newErrors: Errors = {};

        if (!formData.name) {
            newErrors.name = "Name is required";
        }
        if (!formData.lastName) {
            newErrors.lastName = "Last name is required";
        }
        if (!formData.partnerName) {
            newErrors.partnerName = "Partner's name is required";
        }
        if (!formData.partnerLastName) {
            newErrors.partnerLastName = "Partner's last name is required";
        }
        if (!formData.weddingDate && !formData.weddingDateUnknown) {
            newErrors.weddingDate = "Wedding date is required";
        }
        if (!formData.role) {
            newErrors.role = "Role is required";
        }
        if (!formData.partnerRole) {
            newErrors.partnerRole = "Partner's role is required";
        }

        return newErrors;
    }


    console.log(formDataEmail, 'formDataEmail')

    const updateFormData = (key: keyof FormData, value: string | boolean) => {
        setFormData(prevData => ({ ...prevData, [key]: value }));
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length === 0) {

            let formDataISO = { ...formData };
            console.log(formDataISO, 'formDataISO')

            if (formData.weddingDate) {
                const weddingDateISO = formatISO(new Date(formData.weddingDate));
                formDataISO = { ...formDataISO, weddingDate: weddingDateISO };
            }

            try {
                const response = await axios.post(`/api/signin/part2?email=${formDataEmail?.user.email}`, formDataISO,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                console.log(response, 'response')
                if (response.status !== 200) {
                    throw new Error('Something went wrong');
                } else if (pathName === "/sign-upv2") {
                    const encryptedPassword = Cookies.get('tempPassword');

                    if (!encryptedPassword) {
                        throw new Error("No se encontró la cookie 'tempPassword'");
                    }

                    const bytes = CryptoJS.AES.decrypt(encryptedPassword, "process.env.SECRET_KEY");
                    const tempPassword = bytes.toString(CryptoJS.enc.Utf8);
                    signIn('credentials', {
                        email: formDataEmail?.user.email,
                        password: tempPassword,
                        callbackUrl: '/dashboard/rsvp',
                    }).then(() => {
                        Cookies.remove('tempPassword');
                    });

                } else if (pathName === "/sign-up-step2") {
                    router.push('/dashboard/rsvp');
                }

            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const errors = validateForm();
                if (Object.keys(errors).length === 0) {
                    handleSubmit(e); // Aquí se corrigió el error
                } else {
                    setErrors(errors);
                }
            }}>
                <div className='container-input'>
                    <InputField
                        placeholder={t('name')}
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        error={errors.name}
                    />
                    <InputField
                        placeholder={t('lastName')}
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        error={errors.lastName}
                    />
                    <InputField
                        placeholder={t("partnerName")}
                        type="text"
                        value={formData.partnerName}
                        onChange={(e) => updateFormData("partnerName", e.target.value)}
                        error={errors.partnerName}
                    />
                    <InputField
                        placeholder={t("partnerLastName")}
                        type="text"
                        value={formData.partnerLastName}
                        onChange={(e) => updateFormData("partnerLastName", e.target.value)}
                        error={errors.partnerLastName}
                    />
                    <select
                        name="roleOptions"
                        id="rol"
                        value={formData.role}
                        onChange={e => updateFormData("role", e.target.value)}
                        className='selector-container'
                    >
                        <option value="">{t("youRole")}</option>
                        {(extraction === "en" ? roleOptionsEn : extraction === "he" ? roleOptionsHe : roleOptionsEs).map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>
                    <select
                        name="roleOptions"
                        id="rol"
                        value={formData.partnerRole}
                        onChange={e => updateFormData("partnerRole", e.target.value)}
                        className='selector-container'

                    >
                        <option value="">{t("partnerRole")}</option>

                        {(extraction === "en" ? roleOptionsEn : extraction === "he" ? roleOptionsHe : roleOptionsEs).map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>
                    <InputField
                        placeholder={t("weddingDate")}
                        /*   type={formDataBis.weddingDateUnknown ? "text" : (formDataBis.weddingDate ? "date" : "text")} */
                        type={formData.weddingDateUnknown ? "text" : (formData.weddingDate ? "date" : "text")}
                        value={formData.weddingDate}
                        onChange={(e) => updateFormData("weddingDate", e.target.value)}
                        error={errors.weddingDate}
                    />

                    <div>

                        <label className='checkbox'>
                            <input

                                type="checkbox"
                                checked={formData.weddingDateUnknown}
                                onChange={e => updateFormData("weddingDateUnknown", e.target.checked)}
                                style={{ display: 'none' }}
                            />
                            <span className={formData.weddingDateUnknown ? 'checkbox-custom checked' : 'checkbox-custom'}></span>
                            {t('dontKnow')}
                        </label>



                    </div>
                </div>

                {/*      <div>
                    <label className='checkbox'>
                        <input
                            type="checkbox"
                            checked={formData.emailPartnerDontRequired}
                            onChange={e => updateFormData("emailPartnerDontRequired", e.target.checked)}
                            style={{ display: 'none' }}
                        />
                        <span className={formData.emailPartnerDontRequired ? 'checkbox-custom checked' : 'checkbox-custom'}></span>
                        Would you like to invite your partner to collaborate on the dashboard by sharing their email?
                    </label>
                </div> */}
                {/*          {
                    formData.emailPartnerDontRequired &&
                    <InputField
                        placeholder="Partner's Email"
                        type="email"
                        value={formData.emailPartner}
                        onChange={(e) => updateFormData("emailPartner", e.target.value)}
                    />
                } */}
                <Button
                    label={t('save')}
                    type="submit"
                    className={
                        (formData.name && formData.lastName && formData.partnerName && formData.partnerLastName && (formData.weddingDate || formData.weddingDateUnknown))
                            ? 'button-a'
                            : 'button-a-disabled'
                    }
                />
            </form >
        </div >
    );
}

export default SignUpPart2;