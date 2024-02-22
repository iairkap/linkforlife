import React from 'react';
import type { Expense } from '@/types/types';
import "../sass/components/upcomingPayment.scss"
import { Link } from '@/navigation';
interface UpcomingPaymentProps {
    upcomingExpenses?: any[];
    extraction?: string;
}

function UpcomingPayment({ upcomingExpenses, extraction }: UpcomingPaymentProps) {


    //theDate Format that i want is for example  02 Jan 2022
    const paymentFormat = (date: string) => {
        const options = { year: 'numeric' as const, month: 'short' as const, day: '2-digit' as const };
        const formattedDate = new Date(date).toLocaleDateString(undefined, options);

        const [day, month, year] = formattedDate.split(' ');
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

        return `${day} ${capitalizedMonth} ${year}`;
    }

    const moneyFormat = (amount: number) => {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
                {upcomingExpenses?.map((expense) => (
                    <div key={expense.id} className='expense-container-'>
                        <div>
                            <p>{expense.name}</p>
                            <h5>{expense.paymentDate ? paymentFormat(expense.paymentDate.toISOString()) : 'N/A'}</h5>
                        </div>
                        <div>
                            <p>{expense.amount ? moneyFormat(expense.amount) : 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}


export default UpcomingPayment;