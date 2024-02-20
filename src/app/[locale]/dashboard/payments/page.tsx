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


    const { expenseData, loading, fetchData } = useExpenseData();
    const { weddings, refreshData } = useDashboardData();
    const [isOpen, setIsOpen] = useState(false);
    const [configuration, setConfiguration] = useState(false);
    const [tableData, setTableData] = useState(expenseData);
    const [rowClicked, setRowClicked] = useState(null);
    let [splitBetween, setSplitBetween] = useState([]);
    const [expenseDataSelected, setExpenseDataSelected] = useState({});
    const [modalPaymentChange, setModalPaymentChange] = useState(false);


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
    console.log(expenseData)

    console.log(rowClicked)

    useEffect(() => {
        if (rowClicked && expenseData && expenseData.length > 0) {
            const selectedExpense = expenseData.find(expense => expense.id === rowClicked);
            if (selectedExpense) {
                setExpenseDataSelected(selectedExpense);
                setModalPaymentChange(true);
            } else {
                console.log(`No expense found with id ${rowClicked}`);
            }
        }
    }, [rowClicked, expenseData]); // Add expenseData to the dependency array
    console.log(expenseDataSelected)




    if (loading || !weddings || weddings.length === 0) {
        return (<main className='main'>
            <Loader />
        </main >

        )
    }

    return (
        <article className='containerDash'>
            <header className='header'>
                <AddBudget expenseData={expenseData} weddings={weddings} refreshData={refreshData} />
                <AddPayment weddings={weddings} isOpen={isOpen} setIsOpen={setIsOpen} />
                <ConfigurationPaymentsCard setConfiguration={setConfiguration} />
            </header>

            {/* TABLE */}

            <TableVendors expenseData={expenseData} setRowClick={setRowClicked} />




            {/* MODALES */}
            <AddExpense isOpen={isOpen} contentLabel={"Add Expense"} onRequestClose={() => setIsOpen(false)} refreshData={refreshData} onRequestCloseGeneral={() => setIsOpen(false)} splitBetween={splitBetween} />
            <PaymentConfiguration isOpen={configuration} onRequestClose={() => setConfiguration(false)} contentLabel={"Payment Configuration"} />
            <ModalPaymentChange isOpen={modalPaymentChange} onRequestClose={() => setModalPaymentChange(false)} contentLabel={"Payment Configuration"} expenseDataSelected={expenseDataSelected} setExpenseDataSelected={setExpenseDataSelected} />
        </article>
    );
}

export default Payments;


/*  */