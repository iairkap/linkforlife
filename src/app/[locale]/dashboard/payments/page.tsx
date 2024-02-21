"use client"

import React, { useEffect } from 'react';
import { useExpenseData } from '../../helpers/useExpenseData';
import Loader from '../../ui/loader';
import AddBudget from '../../ui/addBudget';
import { useDashboardData } from '../../helpers/useDashboardData';
import "../../sass/layout/dashboard.scss"
import AddPayment from '../../ui/addPayment';
import { useState } from 'react'
import AddExpense from '../../ui/addExpense';
import "../../sass/pages/dashboard.scss"
import { useSession } from 'next-auth/react';
import PaymentConfiguration from '../../ui/paymentConfiguration';
import ConfigurationPaymentsCard from '../../ui/configurationPayments';
import TableVendors from '../../ui/tableVendors';
import { Tab } from '@mui/material';

import ModalPaymentChange from '../../ui/modalPaymentChange';

function Payments() {


    const { expenseData, loading, fetchData, totalPaid, totalAmount } = useExpenseData();
    const { weddings, refreshData } = useDashboardData();
    const [isOpen, setIsOpen] = useState(false);
    const [configuration, setConfiguration] = useState(false);
    const [tableData, setTableData] = useState(expenseData);
    const [rowClicked, setRowClicked] = useState(null);
    let [splitBetween, setSplitBetween] = useState([]);
    const [expenseDataSelected, setExpenseDataSelected] = useState({});
    const [modalPaymentChange, setModalPaymentChange] = useState(false);


    console.log(expenseData)

    /*     console.log(expenseData.find(expense => expense.name === "Photographer")) */


    useEffect(() => {
        if (weddings && weddings.length > 0) {
            const wedding = weddings[0];
            if (wedding.users && wedding.users.length > 0) {
                let names = [];
                for (let user of wedding.users) {
                    names.push(user.name, user.partnerName, `${user.name}+${user.partnerName}`, `${user.name}'s family`, `${user.partnerName}'s family`, `Other`);
                }
                setSplitBetween(names);
            }
        }
    }, [weddings]);

    useEffect(() => {
        if (rowClicked && expenseData && expenseData.length > 0 && !modalPaymentChange) {
            const selectedExpense = expenseData.find(expense => expense.id === rowClicked);
            if (selectedExpense) {
                setExpenseDataSelected(selectedExpense);
                setModalPaymentChange(true);
            } else {
                console.log(`No expense found with id ${rowClicked}`);
            }
        }
    }, [rowClicked, expenseData, modalPaymentChange]);  // Add expenseData to the dependency array
    console.log(expenseDataSelected)





    if (loading || !weddings || weddings.length === 0) {
        return (<main className='main'>
            <Loader />
        </main >

        )
    }

    return (
        <article className='containerDashA'>
            <ConfigurationPaymentsCard setConfiguration={setConfiguration} />

            <section className='layout'>
                <div className='izq'>
                    <AddBudget expenseData={expenseData} weddings={weddings} refreshData={refreshData} totalPaid={totalPaid} totalAmount={totalAmount} />
                    <AddPayment weddings={weddings} isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>

                {/* TABLE */}
                <div className='table'>
                    <TableVendors expenseData={expenseData} setRowClick={setRowClicked} />
                </div>

            </section>
            {/* MODALES */}

            <AddExpense isOpen={isOpen} contentLabel={"Add Expense"} onRequestClose={() => setIsOpen(false)} refreshData={refreshData} onRequestCloseGeneral={() => setIsOpen(false)} splitBetween={splitBetween} />
            <PaymentConfiguration isOpen={configuration} onRequestClose={() => setConfiguration(false)} contentLabel={"Payment Configuration"} />
            <ModalPaymentChange isOpen={modalPaymentChange} onRequestClose={() => {
                setModalPaymentChange(false);
                setExpenseDataSelected({});
                setRowClicked(null);
            }} contentLabel={"Payment Configuration"} expenseDataSelected={expenseDataSelected} setExpenseDataSelected={setExpenseDataSelected} fetchData={fetchData} />
        </article>
    );
}

export default Payments;


/*  */