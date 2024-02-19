"use client"

import React from 'react';
import { useExpenseData } from '../../helpers/useExpenseData';
import Loader from '../../ui/loader';
import AddBudget from '../../ui/addBudget';
import { useDashboardData } from '../../helpers/useDashboardData';
import "../../sass/layout/dashboard.scss"
import AddPayment from '../../ui/addPayment';

function Payments() {


    const { expenseData, loading, fetchData } = useExpenseData();
    const { weddings, refreshData } = useDashboardData();




    if (loading || !weddings || weddings.length === 0) {
        return (<main className='main'>
            <Loader />
        </main >

        )
    }

    return (
        <article className='containerDash'>
            <AddBudget expenseData={expenseData} weddings={weddings} refreshData={refreshData} />
            <AddPayment weddings={weddings} />
        </article>
    );
}

export default Payments;