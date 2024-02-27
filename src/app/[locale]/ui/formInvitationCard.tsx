import React from 'react';
import InputField from './InputField';
import { useState } from 'react';



function formInvitationCard({ invitationCard, weddings }) {
    const [isReadOnly, setIsReadOnly] = useState({
        name: true,
        lastName: true,
        partnerName: true,
        partnerLastName: true,
        weddingDate: true,
        weddingPlace: true
    });
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        partnerName: '',
        partnerLastName: '',
        weddingDate: '',
        weddingPlace: ''
    });


    const updateChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const handleFocus = (name: string) => {
        setIsReadOnly({
            ...isReadOnly,
            [name]: false
        });
    }


    return (
        <div className='all-container'>
            <h2 className='title-form-card'>{invitationCard.model}</h2>
            <section className='form-layout'>
                <h4>Chequea la informacion para las invitaciones</h4>
                {weddings && weddings[0] &&
                    <article className='article-container-text'>
                        <div className='input-container'>
                            <h4>Your Name:</h4>
                            <div className="input-containerBisaBis">
                                <InputField readOnly={isReadOnly.name} placeholder={weddings[0].users[0].name} value={form.name} name='name' onChange={updateChanges} onFocus={() => handleFocus('name')} type={"text"} />
                                <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='input-container'>
                            <h4>Your Lastname:</h4>
                            <div className="input-containerBisaBis">
                                <InputField readOnly={isReadOnly.lastName} placeholder={weddings[0].users[0].lastName} value={form.lastName} name='lastName' onChange={updateChanges} onFocus={() => handleFocus('lastName')} type={"text"} />
                                <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='input-container'>
                            <h4>Your Partner Name:</h4>
                            <div className="input-containerBisaBis">
                                <InputField readOnly={isReadOnly.partnerName} placeholder={weddings[0].users[0].partnerName} value={form.partnerName} name='partnerName' onChange={updateChanges} onFocus={() => handleFocus('partnerName')} type={"text"} />
                                <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='input-container'>
                            <h4>Your Partner Last Name:</h4>
                            <div className="input-containerBisaBis">
                                <InputField readOnly={isReadOnly.partnerLastName} placeholder={weddings[0].users[0].partnerLastName} value={form.partnerLastName} name='partnerLastName' onChange={updateChanges} onFocus={() => handleFocus('partnerLastName')} type={"text"} />
                                <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='input-container'>
                            <h4>Your Wedding Date:</h4>
                            <div className="input-containerBisaBis">
                                <InputField readOnly={isReadOnly.weddingDate} placeholder={weddings[0].users[0].weddingDate} value={form.weddingDate} name='weddingDate' onChange={updateChanges} onFocus={() => handleFocus('weddingDate')} type={"text"} />
                                <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='input-container'>
                            <h4>Your Wedding Time:</h4>
                            <div className="input-containerBisaBis">
                                <InputField readOnly={isReadOnly.weddingDate} placeholder="Wedding time" value={form.weddingDate} name='weddingDate' onChange={updateChanges} onFocus={() => handleFocus('weddingDate')} type={"text"} />
                                <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='input-container'>
                            <h4>Your Wedding Place:</h4>
                            <div className="input-containerBisaBis">
                                <InputField readOnly={isReadOnly.weddingPlace} placeholder="Adress" value={form.weddingPlace} name='weddingPlace' onChange={updateChanges} onFocus={() => handleFocus('weddingPlace')} type={"text"} />
                                <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='input-container'>
                            <h4>Comments:</h4>
                            <div className="input-containerBisaBis">
                                <InputField readOnly={isReadOnly.weddingPlace} placeholder={weddings[0].weddingPlace} value={form.weddingPlace} name='weddingPlace' onChange={updateChanges} onFocus={() => handleFocus('weddingPlace')} type={"text"} />
                                <button className='edit-button'>Edit</button>
                            </div>
                        </div>




                    </article>
                }


            </section>
        </div >
    );
}

export default formInvitationCard;