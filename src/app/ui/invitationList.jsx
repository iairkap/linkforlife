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

function TableInvitationList({
  userInvitationList,
  groupInvitations,
  isLoading,
  setIsLoading,
  groups,
}) {
  const data = useMemo(() => userInvitationList, [userInvitationList]);

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
      /*             {
                            Header: 'מספר טלפון',
                            accessor: 'phoneNumber',
                            c
                        }, */
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
          <thead className="thead">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    className={column.className}
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
        </table>
      </article>
    ),
  };
}

export default TableInvitationList;

{
  /*  <div className="headOfHeader">
          <div className="headito">
            <div className="filter-first">
              <div
                onClick={() => setMenuOpen(!isMenuOpen)}
                style={{ display: "flex", alignItems: "center" }}
                className="filter-b"
              >
                <span>מסנן</span>
                <span class="material-symbols-outlined fa">
                  filter_alt
                </span>{" "}
              </div>

              {isMenuOpen && (
                <div className="menu menu-open">
                  <div>
                    <button onClick={() => setMenuOpen(false)}>x</button>{" "}
                    <input
                      type="checkbox"
                      {...getToggleHideAllColumnsProps()}
                      id="toggle-all"
                    />
                    <label htmlFor="toggle-all">Toggle All</label>
                  </div>
                  {allColumns.map((column) => (
                    <div key={column.id}>
                      <label>
                        <input
                          type="checkbox"
                          {...column.getToggleHiddenProps()}
                          id={`checkbox-${column.id}`}
                        />
                        <label htmlFor={`checkbox-${column.id}`}>
                          {column.Header}
                        </label>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </div>

            <div>{modalButton}</div>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="selectePerSize"
            >
              {[10, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  להציג {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div> */
}

{
  /*   <div className="pagination">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="filterButton"
        >
          {"< Previous"}
        </button>{" "}
        <div>
          {pageOptions.map((_, i) => (
            <button
              key={i}
              onClick={() => gotoPage(i)}
              disabled={i === pageIndex}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="filterButton"
        >
          {"Next >"}
        </button>{" "}
      </div> */
}
