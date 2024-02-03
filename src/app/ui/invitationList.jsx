import React, { useMemo, useState } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import "../sass/layout/table.scss";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="search-container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <button onClick={() => setIsVisible(!isVisible)} className="search">
        <span class="material-symbols-outlined">search</span>
      </button>
      <span>
        <input
          value={globalFilter || ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value || undefined);
          }}
          placeholder={`חיפוש`}
          className={`searchInput ${isVisible ? "visible" : ""}`}
        />
      </span>
    </div>
  );
}

function TableInvitationList({
  userInvitationList,
  groupInvitations,
  isLoading,
  setIsLoading,
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
        accessor: (row) => row.groups.map((group) => group.name).join(", "),
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

  // Descargar los datos como un archivo CSV
  /*     const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
        link.click();
     */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter, selectedRowIds }, // Agrega selectedRowIds aquí
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

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 8 }, // Pass our initial page index and page size to the options
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect // Asegúrate de que estás utilizando useRowSelect aquí
  );
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className="headOfHeader">
        <div>
          <div onClick={() => setMenuOpen(!isMenuOpen)}>
            <span class="material-symbols-outlined">filter_list</span>
          </div>
          {isMenuOpen && (
            <div className="menu menu-open">
              <div>
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
        </div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <table {...getTableProps()} className="my-table">
        <thead className="thead">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={column.className}>
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

      <div>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="filterButton"
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="filterButton"
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="filterButton"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="filterButton"
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[8, 16, 24].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default TableInvitationList;
