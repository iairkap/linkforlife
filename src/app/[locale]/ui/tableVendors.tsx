import React, { useState, useEffect, useMemo } from 'react';
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useColumnOrder,
} from "react-table";
import type { Expense } from "../../../types/types"
import { expenseDataTemplate } from '@/pages/api/utils/expenseDataTemplate';
import "../sass/components/expensesTable.scss"

interface ExpenseData {
    expenseData: Expense[];
    setRowClick: (row: any) => void;
}

function TableVendors({ expenseData, setRowClick }: ExpenseData) {
    const [data, setData] = useState(() => expenseDataTemplate);

    const memoizedData = useMemo(() => expenseData, [expenseData]);



    const columns = useMemo(
        () => [
            {
                Header: "Item Name",
                accessor: "name",
                style: { width: '90%' }
            },
            {
                Header: "Due",
                id: "dueAmount", // use 'id' instead of 'accessor'
                style: { width: '15%' },
                Cell: ({ row }) => {
                    if (row.original.installments && row.original.installments.length > 0) {
                        const alreadyPayed = row.original.installments.reduce((sum, installment) => sum + installment.amount, 0);
                        const dueAmount = row.original.amount - alreadyPayed;
                        const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dueAmount);
                        return <span>{formattedValue}</span>;
                    }
                    return null; // or return a default value
                },
            },
            {
                Header: "Already payed",
                id: "installmentsAmount", // use 'id' instead of 'accessor'
                style: { width: '15%' },
                Cell: ({ row }) => {
                    if (row.original.installments && row.original.installments.length > 0) {
                        const totalAmount = row.original.installments.reduce((sum, installment) => sum + installment.amount, 0);
                        const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount);
                        return <span>{formattedValue}</span>;
                    }
                    return null; // or return a default value
                },
            },
            {
                Header: "total",
                accessor: "amount",
                Cell: ({ value }) => {
                    const formattedValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                    return <span>{formattedValue}</span>;
                },
            },
            {
                Header: "Installments Due Date",
                id: "installmentsDueDate", // use 'id' instead of 'accessor'
                style: { width: '15%' },
                Cell: ({ row }) => {
                    if (row.original.installments && row.original.installments.length > 0) {
                        return <span>{row.original.installments[0].dueDate}</span>;
                    }
                    return null; // or return a default value
                },
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data: memoizedData,
            initialState: { pageSize: 20 }, // Set page size here

        },
        useFilters,
        useGlobalFilter,
        usePagination,
        useRowSelect,
        useColumnOrder,
    );


    return (
        <article className="conttable">
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
            />
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className="th">
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="tbody">
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="tr" onClick={() => setRowClick(row.original.id)}>                                {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()} className="td">
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </article>
    );
}

export default TableVendors;