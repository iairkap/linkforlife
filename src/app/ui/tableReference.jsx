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

  getToggleHideAllColumnsProps, // Asegúrate de que estás aceptando esto aquí
}) => {
  return (
    <div className="headOfHeader">
      <div className="headito">
        <button onClick={handleOpenModal} className="buttonPLus">
          הוסף אורח +
        </button>
        {/*         <select
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
        </select> */}
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
