import React from 'react';
import { useState } from 'react';
import InputField from './InputField';
import Button from './button';
import axios from 'axios';
import "../sass/components/budget.scss"

interface Expense {
    id?: number;
    name?: string;
    description?: string;
    amount?: number;
    weddingId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    alreadyPay?: boolean;
    paymentDate?: Date;
    paidById?: number;
}

interface Props {
    expenseData: Expense[];
    weddings: any;
    refreshData: any;
    totalPaid: number;
    totalAmount: number;
}

function AddBudget({ expenseData, weddings, refreshData, totalPaid, totalAmount }: Props) {

    const [budget, setBudget] = useState("");


    const handleAddBudget = async () => {
        try {
            const { data } = await axios.post("/api/budget", {
                budget
            });
            refreshData(); // Llama a refreshData en lugar de refershData
        } catch (error) {

        }
    }

    if (weddings[0].budget === null) {
        weddings[0].budget = 0;
    }

    const moneyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(weddings[0].budget);

    const amountFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount);


    const due = totalAmount - totalPaid;
    const dueFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(due);

    const paidPercentage = (totalPaid / weddings[0].budget) * 100;

    const amountPercentage = (totalAmount / weddings[0].budget) * 100;

    const barFromPayment = (totalPaid / totalAmount) * 100;




    return (
        <div>
            <div className='card-container'>
                <span className='span'>+</span>
                <div className='fila-info'>
                    <h4>Presupuesto asignado: </h4>
                    <h4>{moneyFormat}</h4>
                </div>
                <span>Indicador de gasto:</span>
                <div className='progress-bar-container'>
                    <div className='alreadypaid-percentage' style={{ width: `${paidPercentage}%` }}></div>
                    <div className="debt-percentage" style={{ width: `${amountPercentage}%` }}></div>
                </div>
                <span>sobre costos reales:</span>
                <div className='progress-bar-container'>
                    <div className='alreadypaid-percentage' style={{ width: `${barFromPayment}%` }}></div>
                </div>
                <div className='fila-info'>
                    <h4>Gastos documentados:</h4>
                    <h4>{amountFormat}</h4>
                </div>
                <div className='fila-info'>
                    <h4>Pagos efectuados:</h4>
                    <h4>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPaid)}</h4>
                </div>
                <div className='fila-info'>
                    <h4>Importe por pagar:</h4>
                    <h4>{dueFormat}</h4>
                </div>

            </div>
        </div>
    );
}

export default AddBudget;

