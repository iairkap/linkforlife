import React from "react";
import GlobalFilter from "./GlobalFilter";
import "../sass/pages/dashboard.scss";
const HeaderFilter = ({
  isMenuOpen,
  setMenuOpen,
  handleOpenModal,
  allColumns,
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  pageSize,
  setPageSize,
  getToggleHideAllColumnsProps,
  setFilter,
  filter,
}) => {
  console.log(preGlobalFilteredRows);

  /* 
  const [filter, setFilter] = useState('all');


  const filteredUserInvitationList = preGlobalFilteredRows.filter(
    (invitation) => {
      if (filter === "confirmed") {
        return invitation.isConfirmed;
      } else if (filter === "notConfirmed") {
        return !invitation.isConfirmed;
      } else {
        return true;
      }
    }
  ); */

  return (
    <div className="headOfHeader">
      <div className="headito">
        <div className="button-first-container">
          <button onClick={handleOpenModal} className="buttonPLus">
            הוסף אורח +
          </button>
          <div className="button-container">
            <button
              className={
                (filter === "confirmed" && "button-chip-active") ||
                "button-chip"
              }
              onClick={() =>
                setFilter(filter === "confirmed" ? "all" : "confirmed")
              }
            >
              Confirmed
            </button>
            <button
              className={
                (filter === "notConfirmed" && "button-chip-active") ||
                "button-chip"
              }
              onClick={() =>
                setFilter(filter === "notConfirmed" ? "all" : "notConfirmed")
              }
            >
              Not Confirmed
            </button>
          </div>
        </div>

        <div className="filter-first">
          <div
            onClick={() => setMenuOpen(!isMenuOpen)}
            style={{ display: "flex", alignItems: "center" }}
            className="filter-b"
          >
            <span>מסנן</span>
            <span class="material-symbols-outlined fa">filter_alt</span>{" "}
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
      </div>
    </div>
  );
};

export default HeaderFilter;
