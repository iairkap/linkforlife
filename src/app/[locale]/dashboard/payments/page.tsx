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
import type { Expense } from '@/types/types';
import ModalPaymentChange from '../../ui/modalPaymentChange';

function Payments() {


    const { expenseData, loading, fetchData, totalPaid, totalAmount, categories } = useExpenseData();
    const { weddings, refreshData } = useDashboardData();
    const [isOpen, setIsOpen] = useState(false);
    const [configuration, setConfiguration] = useState(false);
    const [tableData, setTableData] = useState(expenseData);
    const [rowClicked, setRowClicked] = useState<number | null>(null);
    let [splitBetween, setSplitBetween] = useState<string[]>([]);
    const [expenseDataSelected, setExpenseDataSelected] = useState<Expense | {}>({});
    const [modalPaymentChange, setModalPaymentChange] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});



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
    const onRowClick = (id: number) => {
        const selectedRow = expenseData.find(row => row.id === id);
        if (selectedRow?.isCategoryRow) {
            setExpandedCategories(prevState => ({
                ...prevState,
                [String(selectedRow.category)]: !prevState[String(selectedRow.category)],
            }));
        } else {
            setRowClicked(id);
        }
    };


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
                    <TableVendors expenseData={expenseData} setRowClick={onRowClick} categories={categories} setExpandedCategories={setExpandedCategories} expandedCategories={expandedCategories} />
                </div>

            </section>
            {/* MODALES */}

            <AddExpense categories={categories} isOpen={isOpen} contentLabel={"Add Expense"} onRequestClose={() => setIsOpen(false)} refreshData={refreshData} onRequestCloseGeneral={() => setIsOpen(false)} splitBetween={splitBetween}
                fetchData={fetchData} />


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