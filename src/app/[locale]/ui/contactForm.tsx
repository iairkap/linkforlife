import React, { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import "../sass/components/ContactForm.scss";
import axios from 'axios';

interface FormState {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        message: ''
    });

    const t = useTranslations('ContactForm');

    const inputType = (key: keyof FormState) => {
        if (key === 'email') return 'email';
        if (key === 'message') return 'textarea';
        return 'text';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/contactForm', form);
            if (response.status === 200) {
                setForm({ name: '', email: '', message: '' });
            }
        } catch (error) {
            console.error('Error sending message', error);
        }
    };
    return (
        <section className='general-s'>
            <article className='layout-contact-us-title'>
                <div>
                    <h4 className="title-contact-form">{t("contactUs")}</h4>
                    <span className='span-contact-form'>{t("span")}</span>
                </div>
                <div>
                    <h4 className='email-contact-form'>{t("email")}</h4>
                    <span>beyondtik.il@gmail.com</span>
                </div>
            </article>
            <form action="" className='form-container' onSubmit={handleSubmit}>
                {Object.keys(form).map((key) => (
                    <div key={key} className='input-form-container'>
                        <label htmlFor={key} className='label-form'>{t(key)}</label>
                        {inputType(key as keyof FormState) === 'textarea' ? (
                            <textarea id={key} value={form[key as keyof FormState]} onChange={handleChange} className='text-area-form'
                                rows={10} />
                        ) : (
                            <input type={inputType(key as keyof FormState)} id={key} value={form[key as keyof FormState]} onChange={handleChange} className='input-form' />
                        )}
                    </div>
                ))}
                <div className='button-container' style={{ width: "100%" }}>
                    <button type="submit" className='button-homepageB' style={{ width: "100%" }}>{t("send")}</button>
                </div>
            </form>
        </section>
    );
}

export default ContactForm;