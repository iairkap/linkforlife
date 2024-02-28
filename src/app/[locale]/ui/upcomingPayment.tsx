import React from 'react';
import type { Expense } from '@/types/types';
import "../sass/components/upcomingPayment.scss"
import { Link } from '@/navigation';
interface UpcomingPaymentProps {
    upcomingExpenses?: any[];
    extraction?: string;
}

function UpcomingPayment({ upcomingExpenses, extraction }: UpcomingPaymentProps) {
    const paymentFormat = (date: string) => {
        const options = { year: 'numeric' as const, month: 'short' as const, day: '2-digit' as const };
        const formattedDate = new Date(date).toLocaleDateString(undefined, options);

        const [day, month, year] = formattedDate.split(' ');
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

        return `${day} ${capitalizedMonth} ${year}`;
    }

    const defaultExpense = {
        name: 'Expense',
        paymentDate: '2029-01-01T03:00:00.000Z',
        amount: 0,
    };
    const moneyFormat = (amount: number) => {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }


    if (upcomingExpenses) {
        console.log(upcomingExpenses[0]?.paymentDate)
    }


    return (
        <div className='card-container-payments-upcoming'>
            <header className='header-payment-upcoming'>
                <h3>Upcoming Payments</h3>
                <Link href={"dashboard/payments"}>
                    <span className='spanda'>See More</span>
                </Link>
            </header>
            <div className='container-expense-genral'>
                {Array.from({ length: 4 }).map((_, i) => {
                    const expense = upcomingExpenses && upcomingExpenses[i] ? upcomingExpenses[i] : defaultExpense;
                    return (
                        <div key={i} className='expense-container-'>
                            <div>
                                <p>{expense.name}</p>
                                <h5>{expense.paymentDate ? paymentFormat(expense.paymentDate) : 'N/A'}</h5>
                            </div>
                            <div>
                                <p>{moneyFormat(expense.amount ?? 0)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default UpcomingPayment;