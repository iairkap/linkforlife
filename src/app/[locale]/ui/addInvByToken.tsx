import React from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import Button from './button';
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import MultiSelect from './Select';
import { useTranslations } from 'next-intl';
import ModalNotification from './modalNotification';
import { useState } from 'react';
import { storage } from '@/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface AddInvProps {
    weddingId: string | undefined;

}
function AddInvByToken({ weddingId }: AddInvProps) {
    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [status, setStatus] = useState(200);
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [avatar, setAvatar] = useState('');



    const t = useTranslations('ModalAddInv');



    const handleAddInv = async () => {
        const id = weddingId;
        try {
            const invitation = {
                name,
                lastName,
                emailInvitation: email,
                phoneNumber,
                avatar
            };

            const response = await axios.post(`/api/wedding/${id}`, invitation);

            if (response.status === 200) {

                setStatus(response.status); // Update the status state here
            }
        } catch (error) {

            console.error('Failed to add invitation:', error);
            setStatus(500); // Update the status state here in case of error
        }
        setIsOpen(true); // Move this line here
    }

    const handleImageChange = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        if (image) {
            const storageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Handle the upload progress
                },
                (error) => {

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        setAvatar(downloadURL);
                    });
                }
            );
        }
    };
    return (

        <section className='containerModalInvitationWedding'>
            <h1 className='title-container'>{t("addInvBis")}</h1>
            <article className="layout">
                <InputField
                    value={name}
                    type="text"
                    placeholder={t("name")}
                    onChange={(e) => setName(e.target.value)}
                    error=''
                />
                <InputField
                    value={lastName}
                    type="text"
                    placeholder={t("lastName")}
                    onChange={(e) => setLastName(e.target.value)}
                    error=''
                />
                <InputField
                    value={email}
                    type="text"
                    placeholder={t("email")}
                    onChange={(e) => setEmail(e.target.value)}
                    error=''
                />
                <InputField
                    value={phoneNumber}
                    type="text"
                    placeholder={t("phone")}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error=''
                />

                <Button label={t("save")} onClick={handleAddInv} className='button-a' />

                <ModalNotification message="Ok" status={status} isOpen={isOpen} onRequestClose={() => { }} />

                <input type="file" name="avatar" id="avatar" onChange={handleImageChange} />
                <button onClick={handleUpload}>Upload</button>
            </article>

        </section>
    );
}

export default AddInvByToken;