import React, { useState } from 'react';
import Modal from './modal';
import InputField from './InputField';
import type { ModalType } from "../../../types/types"
import { useTranslations } from 'next-intl';
import axios from 'axios';
import "../sass/components/payments.scss"
import MultiSelect from './Select';
import Button from './button';

function AddExpense({ isOpen, contentLabel, onRequestClose, refreshData, onRequestCloseGeneral, splitBetween }: ModalType) {

    const [form, setForm] = useState({
        name: "",
        description: "",
        amount: "",
        alreadyPay: false,
        paymentDate: "",
        splitBetween: [],
        status: "PENDING",
        paidById: null,
        installment: false,
        installmentAmout: "",
        installmentDueDate: "",
        installmentPaid: false,
    });

    const updateFormData = (key: keyof typeof form, value: string | boolean | number | string[]) => {
        setForm(prevData => ({ ...prevData, [key]: value }));
    }

    const t = useTranslations('ModalAddExpense');


    /*     console.log(form.splitBetween)
     */

    const handleForm = async () => {
        try {
            const expense = {
                name: form.name,
                description: form.description,
                amount: parseFloat(form.amount),
                alreadyPay: form.alreadyPay,
/*                 splitBetween: form.splitBetween,
 */                paymentDate: `${form.paymentDate}T00:00:00.000Z`,
                status: form.status,
                installments: form.installment,
                installmentAmout: parseFloat(form.installmentAmout),
                installmentDueDate: `${form.installmentDueDate}T00:00:00.000Z`,
                installmentPaid: form.installmentPaid,
            };

            const response = await axios.post('/api/expenses', expense);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div>
            <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"Paid"}>

                <section className='containerModalInvitationWedding'>

                    <h1 className='title-container'>
                        {t("addExpense")}
                    </h1>
                    <article className="layout">
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
                        <InputField
                            type={form.paymentDate ? "date" : "text"}
                            value={form.paymentDate}
                            placeholder={t("paymentDate")}
                            onChange={(e) => updateFormData("paymentDate", e.target.value)}
                            error=''
                        />

                        <MultiSelect span='Split between' value={form.splitBetween} onChange={(e) => updateFormData("splitBetween", e)} options={splitBetween} />
                        <br />
                        <div>
                            <label className='checkbox'>
                                <input

                                    type="checkbox"
                                    checked={form.alreadyPay}
                                    onChange={e => updateFormData("alreadyPay", e.target.checked)}
                                    style={{ display: 'none' }}
                                />
                                <span className={form.alreadyPay ? 'checkbox-custom checked' : 'checkbox-custom'}></span>
                                Already pay?                        </label>
                        </div>
                        <div>
                            <label className='checkbox'>
                                <input

                                    type="checkbox"
                                    checked={form.installment}
                                    onChange={e => updateFormData("installment", e.target.checked)}
                                    style={{ display: 'none' }}
                                />
                                <span className={form.installment ? 'checkbox-custom checked' : 'checkbox-custom'}></span>
                                Cuotas  </label>
                        </div>
                        {
                            form.installment && (
                                <div>

                                    <InputField
                                        value={form.installmentAmout}
                                        type="number"
                                        placeholder={t("cuotas")}
                                        onChange={(e) => updateFormData("installmentAmout", e.target.value)}
                                        error=''
                                    />
                                    <InputField
                                        type={form.installmentDueDate ? "date" : "text"}
                                        value={form.installmentDueDate}
                                        placeholder={t("dueDate")}
                                        onChange={(e) => updateFormData("installmentDueDate", e.target.value)}
                                        error=''
                                    />
                                </div>

                            )
                        }
                    </article>
                </section >
                <Button label={t("save")} onClick={handleForm} className='button-a' />
            </Modal>
        </div>
    );
}

export default AddExpense;