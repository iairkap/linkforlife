import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useColumnOrder,
} from "react-table";
import { expenseDataTemplate } from "@/pages/api/utils/expenseDataTemplate";
import "../sass/components/expensesTable.scss";
import {
  TableInstance,
  UsePaginationState,
  UseGlobalFiltersState,
} from "react-table";
import {
  UsePaginationInstanceProps,
  UseGlobalFiltersInstanceProps,
} from "react-table";
import { Cell } from "react-table";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { extractLocaleFromPathName } from "../utils/getLocale";
import { translationsTable } from "../utils/translationsTablePayment";

function TableVendors({
  expenseData,
  setRowClick,
  categories,
  setExpandedCategories,
  expandedCategories,
}) {
  const [data, setData] = useState(() => expenseDataTemplate);

  const t = useTranslations("tablePayment");

  const extraction = extractLocaleFromPathName(usePathname());
  console.log(extraction);

  const memoizedData = useMemo(() => expenseData, [expenseData]);

  const columns = useMemo(
    () => [
      {
        Header: t("itemName"),
        accessor: "name",
        style: { width: "90%" },
        Cell: ({ row }) => {
          if (row.original.isCategoryRow) {
            return (
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                {translationsTable[extraction][row.original.category]}
              </span>
            );
          }
          return (
            <span>{translationsTable[extraction][row.original.name]}</span>
          );
        },
      },
      {
        Header: t("due"),
        id: "dueAmount", // use 'id' instead of 'accessor'
        style: { width: "35%" },
        Cell: ({ row }) => {
          if (
            row.original.installments &&
            row.original.installments.length > 0
          ) {
            const alreadyPayed = row.original.installments.reduce(
              (sum, installment) => sum + installment.amount,
              0
            );
            const dueAmount = row.original.amount - alreadyPayed;
            const formattedValue = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(dueAmount);
            return <span>{formattedValue}</span>;
          }
          return null; // or return a default value
        },
      },
      {
        Header: t("alreadyPaid"),
        id: "installmentsAmount", // use 'id' instead of 'accessor'
        style: { width: "35%" },
        Cell: ({ row }) => {
          if (
            row.original.installments &&
            row.original.installments.length > 0
          ) {
            const totalAmount = row.original.installments.reduce(
              (sum, installment) => sum + installment.amount,
              0
            );
            const formattedValue = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalAmount);
            return <span>{formattedValue}</span>;
          }
          return null; // or return a default value
        },
      },
      {
        Header: t("total"),
        accessor: "amount",
        Cell: ({ value }) => {
          if (!value) {
            return null;
          }
          const formattedValue = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(value);
          return <span>{formattedValue}</span>;
        },
      },
      {
        Header: t("installmentsDueDate"),
        id: "installmentsDueDate", // use 'id' instead of 'accessor'
        style: { width: "105%" },
        Cell: ({ row }) => {
          if (
            row.original.installments &&
            row.original.installments.length > 0
          ) {
            return <span>{row.original.installments[0].dueDate}</span>;
          }
          return null; // or return a default value
        },
      },
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
      initialState: { pageSize: 20 }, // Cast to your extended state type here
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useColumnOrder
  );

  console.log(data);
  return (
    <article className="conttable">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <table
        {...getTableProps()}
        className={`table ${extraction === "he" ? "rtl" : ""}`}
      >
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
              <tr
                {...row.getRowProps()}
                className="tr"
                onClick={() => setRowClick(row.original.id)}
              >
                {" "}
                {row.cells.map((cell) => {
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
