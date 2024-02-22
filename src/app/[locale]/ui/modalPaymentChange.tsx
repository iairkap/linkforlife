import React, { useEffect, useState } from 'react';
import Modal from './modal';
import type { ModalType } from "../../../types/types"
import InputField from './InputField';
import { useTranslations } from 'next-intl';
import "../sass/components/payments.scss"
import ReactDayPicker from './datePicker';
import Button from './button';
import axios from 'axios';
import { on } from 'events';
import { set } from 'date-fns';
interface ExpenseDataProps {
    expenseDataSelected: any;
    setExpenseDataSelected: (value: any) => void; // 
    fetchData: () => void;
}

function ModalPaymentChange({ isOpen, onRequestClose, contentLabel, expenseDataSelected, setExpenseDataSelected, fetchData }: ModalType & ExpenseDataProps) {


    const [payment, setPayment] = useState(false);
    const [form, setForm] = useState({
        name: expenseDataSelected.name,
        description: expenseDataSelected.description,
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



    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onRequestClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onRequestClose]);


    const t = useTranslations('ModalAddExpense');
    const handleClick = () => {
        setPayment(prevPayment => !prevPayment);
    }

    const label = payment ? "Guardar" : "Agregar pago";



    const handleSubmit = async () => {

        const expenseId = expenseDataSelected.id;
        try {
            const expense = {
                expenseId: expenseId,
                name: form.name,
                description: form.description,
                amount: parseFloat(form.amount),
                alreadyPay: form.alreadyPay,
                paymentDate: new Date(form.paymentDate).toISOString(),
                status: form.status,
                installments: form.installment,
                installmentAmout: parseFloat(form.installmentAmout),
                installmentDueDate: `${form.installmentDueDate}T00:00:00.000Z`,
                installmentPaid: form.installmentPaid,
            };
            const response = await axios.patch('/api/expenses', expense);
            fetchData();
        } catch (error) {
            console.error(error);
        } finally {
            onRequestClose();
        }
    }

    useEffect(() => {
        setForm({
            name: expenseDataSelected.name,
            description: expenseDataSelected.description,
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
    }, [expenseDataSelected]);


    console.log(isOpen)

    const handleUpdateInstallment = async () => {
        try {
            const createInstallment = {
                expenseId: expenseDataSelected.id,
                amount: parseFloat(form.installmentAmout),
            }
            const response = await axios.post('/api/cuotas', createInstallment);
            setPayment(false);
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <Modal isOpen={isOpen} contentLabel={contentLabel} onRequestClose={onRequestClose} icon={"Paid"}>

            <section className='containerModalInvitationWedding'>
                <h1>{expenseDataSelected.name}</h1>
                {!payment &&
                    <article className='layoutbis'>
                        <div className='fila'>
                            <h4>Costo:</h4>
                            <section className='absolute'>
                                <div className='place-holder-money'>
                                    <span>$</span>
                                </div>
                                <InputField
                                    textAlign='end'
                                    value={form.amount}
                                    type="number"
                                    placeholder={"0.00"}
                                    onChange={(e) => updateFormData("amount", e.target.value)}
                                    error=''
                                />
                            </section>
                        </div>

                        <div className='fila'>
                            <h4>Vencimiento</h4>
                            <ReactDayPicker date={form.paymentDate}
                                onChange={(date: any) => updateFormData("paymentDate", date)}
                            />
                        </div>
                        <div className='buttoncontainer'>
                            <Button label={"Agregar Pago"} onClick={handleClick} className='button-d' />
                            <Button label={"GENERAL EXPENSE"} onClick={handleSubmit} className='button-c' />
                        </div>
                    </article>
                }
                {
                    payment &&
                    <article className='layoutbis'>
                        <div className='fila'>
                            <h4>Monto:</h4>
                            <section className='absolute'>
                                <div className='place-holder-money'>
                                    <span>$</span>
                                </div>
                                <InputField
                                    textAlign='end'
                                    value={form.installmentAmout}
                                    type="number"
                                    placeholder={"0.00"}
                                    onChange={(e) => updateFormData("installmentAmout", e.target.value)}
                                    error=''
                                />
                            </section>
                        </div>
                        <Button label={"agregarInstallment"} onClick={handleUpdateInstallment} className='button-d' />



                    </article>

                }
            </section>

        </Modal >
    );
}

export default ModalPaymentChange;