import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import "../sass/layout/modalContent.scss"
import axios from 'axios';
import { useDashboardData } from '../helpers/useDashboardData';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { extractLocaleFromPathName } from '../utils/getLocale';
interface modalGroupProps {
    isOpen: boolean;
    contentLabel: string;
    onRequestClose: () => void;
    onRequestCloseGeneral: () => void;
    weddings: any[];
    setGroups: (groups: any) => void;

}


function ModalGroup({ isOpen, contentLabel, onRequestClose, onRequestCloseGeneral, weddings, setGroups }: modalGroupProps) {


    const pathName = usePathname();
    const extraction = extractLocaleFromPathName(pathName)

    const containerModalClassName = extraction === "he" ? "containerModalInvitationWeddingHe" : "containerModalInvitationWeddingA";
    const { fetchData, isLoading, setIsLoading, } = useDashboardData();
    const [form, setForm] = useState<{ name: string, names: string[], weddingId: number | undefined }>({
        name: "",
        names: [],
        weddingId: weddings[0]?.id
    })

    const weddingId = weddings[0]?.id;

    const handleAddOtherGroup = () => {
        setForm({ ...form, names: [...form.names, form.name], name: "" });
    }

    const handleSubmit = async () => {
        try {
            const allGroupNames = [...form.names, form.name];
            const groups = allGroupNames.map(name => ({ name, weddingId: form.weddingId }));
            const response = await axios.post('/api/groupsList', groups);
            const newGroup = response.data;

            setGroups((prevGroups: any[]): any => [...prevGroups, ...newGroup])
            fetchData();
            onRequestCloseGeneral();
            setForm({ name: "", names: [], weddingId: weddings[0]?.id });
        } catch (error) {
            console.error(error);

        }
    }
    const handleRemoveGroup = (index: number) => {
        const newNames = [...form.names];
        newNames.splice(index, 1);
        setForm({ ...form, names: newNames });
    }

    const t = useTranslations("createGroup");
    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"groups_3"}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <section className={containerModalClassName}>
                <article className='layout-groups-container'>
                    <h1 className='title-container'>{t("createGroup")}</h1>
                    <InputField
                        type="text"
                        placeholder={t("groupName")}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {form.names.map((name, index) => (
                        <div key={index} className='erase-container'>
                            <InputField
                                type="text"
                                placeholder={t("groupName")}
                                value={name}
                                onChange={(e) => {
                                    const newNames = [...form.names];
                                    newNames[index] = e.target.value;
                                    setForm({ ...form, names: newNames });
                                }}
                            />
                            <button onClick={() => handleRemoveGroup(index)} className='erase-button'><span className="material-symbols-outlined">
                                delete
                            </span></button>
                        </div>
                    ))}
                    <div className='add-other-children'>
                        <button onClick={handleAddOtherGroup} className='button-add-children'>{t("addOtherGroup")}</button>
                    </div>
                </article>
                <button onClick={handleSubmit} className='button-a'>{t("save")}</button>
            </section>
        </Modal>
    );
}

export default ModalGroup;