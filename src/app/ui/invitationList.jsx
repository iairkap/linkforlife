import React, { useMemo, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useColumnOrder,
} from "react-table";
import "../sass/layout/table.scss";
import GlobalFilter from "./GlobalFilter";
import FirstSteps from "./firstSteps";

function TableInvitationList({
  userInvitationList,
  groupInvitations,
  isLoading,
  setIsLoading,
  groups,
  ModalFirstSteps,
  setModalFirstSteps,
  refreshData,
  weddings,
  user,
}) {
  const data = useMemo(() => userInvitationList, [userInvitationList]);

  const isWeddingsEmpty = weddings && weddings.length === 0;

  const columns = useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input
              type="checkbox"
              {...getToggleAllRowsSelectedProps()}
              id="myCheckbox"
            />
            <label htmlFor="myCheckbox"></label>
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <input
              type="checkbox"
              {...row.getToggleRowSelectedProps()}
              id={`myCheckbox-${row.id}`}
            />
            <label htmlFor={`myCheckbox-${row.id}`}></label>
          </div>
        ),
      },

      {
        Header: "שם",
        accessor: (row) => `${row.name} ${row.lastName}`,
        className: "column-name",
      },

      {
        Header: "אמייל",
        accessor: "emailInvitation",
        className: "column-email",
      },

      {
        Header: "הוזמן על ידי",
        accessor: "invitedBy",
        className: "column-invitedBy",
      },
      {
        Header: "קבוצות",
        id: "groups",
        accessor: (row) =>
          row.groups ? row.groups.map((group) => group.name).join(", ") : "",
        filter: "includes",
        Filter: ({ column }) => {
          return (
            <input
              className="filterInput"
              value={column.filterValue || ""}
              onChange={(e) => column.setFilter(e.target.value)}
            />
          );
        },
        className: "column-groups",
        Cell: ({ value }) => (
          <div className="group-chip-container">
            {value.split(", ").map((groupName) => (
              <span className="group-chip">{groupName}</span>
            ))}
          </div>
        ),
      },
      {
        Header: "משתתף",
        accessor: "isAttending",
        Cell: ({ value }) =>
          value ? (
            <span className="material-symbols-outlined">done</span>
          ) : (
            <span className="material-symbols-outlined">close</span>
          ),
        className: "column-isAttending",
      },
      {
        Header: "אישור נוכחות",
        accessor: "isConfirmed",
        Cell: ({ value }) =>
          value ? (
            <span className="material-symbols-outlined">done</span>
          ) : (
            <span className="material-symbols-outlined">close</span>
          ),
        className: "column-isConfirmed",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => console.log(row.original)}>
              <span class="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter, selectedRowIds }, // Correctly destructured here
    page, // Instead of using 'rows', we'll use page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { pageIndex, pageSize }, // Only pageIndex and pageSize are in this state
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 8 }, // Pass our initial page index and page size to the options
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect, // Make sure you're using useRowSelect here
    useColumnOrder
  );
  return {
    tableProps: {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      preGlobalFilteredRows,
      setGlobalFilter,
      state: { globalFilter, selectedRowIds },
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      allColumns,
      getToggleHideAllColumnsProps,
      state: { pageIndex, pageSize },
    },
    renderTable: (
      <article className="conttable">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />

        <table {...getTableProps()} className="my-table">
          <thead className={`${isWeddingsEmpty}?"thead-disable":"thead"}`}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    className={`${column.className} ${
                      isWeddingsEmpty ? "empty-weddings" : ""
                    }`}
                    data-checkbox-header={index === 0} // Asume que el checkbox está en la primera columna
                    data-actions-header={
                      index === headerGroup.headers.length - 1
                    } // Asume que "actions" está en la última columna
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              // Cambia 'rows' por 'page'
              prepareRow(row);
              let rowProps = row.getRowProps();
              if (selectedRowIds[row.id]) {
                rowProps = {
                  ...rowProps,
                  style: {
                    ...rowProps.style,
                    background: "rgba(129, 131, 105, 0.32)",
                  },
                }; // Cambia el estilo como quieras aquí
              }
              return (
                <tr {...rowProps} className="my-row">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps({
                        className: `${cell.column.className} my-cell`,
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          {isWeddingsEmpty && (
            <FirstSteps
              isOpen={ModalFirstSteps}
              onRequestClose={() => setModalFirstSteps(false)}
              contentLabel="a"
              refreshData={refreshData}
              user={user}
            />
          )}
        </table>
      </article>
    ),
  };
}

export default TableInvitationList;
