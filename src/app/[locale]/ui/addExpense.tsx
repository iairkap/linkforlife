import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import type { ModalType } from "../../../types/types"
import { useTranslations } from 'next-intl';
import axios from 'axios';
import "../sass/components/payments.scss"
import MultiSelect from './Select';
import Button from './button';
import ReactDayPicker from './datePicker';

interface ExpenseDataProps {
    categories: string[];
    fetchData: () => void;
}

function AddExpense({ isOpen, contentLabel, onRequestClose, refreshData, onRequestCloseGeneral, splitBetween, categories, fetchData }: ModalType & ExpenseDataProps) {

    const [form, setForm] = useState({
        name: "",
        description: "",
        amount: "",
        alreadyPay: false,
        paymentDate: "",
        splitBetween: [],
        status: "PENDING",
        paidById: null,
        categories: [] as string[], // Aquí especificamos que `categories` es un array de strings
    });
    const [isOther, setIsOther] = useState(false);
    const [otherCategory, setOtherCategory] = useState("");

    const updateFormData = (key: keyof typeof form, value: string | boolean | number | string[]) => {
        setForm(prevData => ({ ...prevData, [key]: value }));
    }
    const t = useTranslations('ModalAddExpense');





    const handleForm = async () => {
        try {
            const expense = {
                name: form.name,
                description: form.description,
                amount: parseFloat(form.amount),
                alreadyPay: form.alreadyPay,
                paymentDate: new Date(form.paymentDate).toISOString(),
                status: form.status,
                categories: form.categories.includes('other') ? otherCategory : form.categories,
            };

            const response = await axios.post('/api/expenses', expense);
            fetchData();
            onRequestClose();
        } catch (error) {
            console.error(error);
        }
    }

    const handleCategoryChange = (event: any) => {
        const selectedCategory = event.target.value;
        form.categories = selectedCategory;
        setIsOther(selectedCategory === 'other');
    }



    return (
        <div>
            <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"Paid"}>
                <section className='containerModalInvitationWedding'>
                    <h1 className='title-container'>
                        {t("addExpense")}
                    </h1>
                    <article className='layoutbis'>
                        <InputField
                            value={form.name}
                            type="text"
                            placeholder={t("name")}
                            onChange={(e) => updateFormData("name", e.target.value)}
                            error=''
                        />
                        <InputField
                            value={form.description}
                            type="text"
                            placeholder={t("description")}
                            onChange={(e) => updateFormData("description", e.target.value)}
                            error=''
                        />
                        <InputField
                            value={form.amount}
                            type="number"
                            placeholder={t("amount")}
                            onChange={(e) => updateFormData("amount", e.target.value)}
                            error=''
                        />
                        <ReactDayPicker date={form.paymentDate}
                            onChange={(date: any) => updateFormData("paymentDate", date)}
                            error=''
                        />

                        <select
                            name="categories"
                            id="categories"
                            value={form.categories}
                            onChange={(e) => {
                                updateFormData("categories", e.target.value);
                                handleCategoryChange(e);
                            }}
                        >
                            <option value="">Please choose a Categorie</option>
                            {
                                categories.map((categorie, index) => {
                                    return <option key={index} value={categorie}>{categorie}</option>
                                })
                            }
                            <option value="other">other</option>
                        </select>
                        {isOther && (

                            <InputField value={otherCategory} type={"text"} onChange={(e) => setOtherCategory(e.target.value)} placeholder="Enter other category" />


                        )}
                        {

                        }

                        {/*       <MultiSelect span='Split between' value={form.splitBetween} onChange={(e) => updateFormData("splitBetween", e)} options={splitBetween} />


 */}

                    </article>
                </section >
                <Button label={t("save")} onClick={handleForm} className='button-a' />
            </Modal>
        </div >
    );
}

export default AddExpense;