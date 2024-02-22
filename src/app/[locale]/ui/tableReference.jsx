import React from "react";
import GlobalFilter from "./GlobalFilter";
import "../sass/pages/dashboard.scss";
import { useTranslations } from "next-intl";
import ToggleMenu from "./toggleMenu";

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
  extraction,
}) => {
  const t = useTranslations("RSVPTABLE");

  return (
    <div className="headOfHeader">
      <div className="headito">
        <div className="button-first-container">
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
              {t("isConfirmed")}
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
              {t("notConfirmed")}
            </button>
          </div>
        </div>

        <div className="filter-first">
          <div
            onClick={() => setMenuOpen(!isMenuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              position: "relative",
            }}
            className="filter-b"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M9 1.5C11.2958 1.5 13.5458 1.69334 15.7358 2.065C16.18 2.14 16.5 2.52834 16.5 2.97834V3.84834C16.5 4.09456 16.4515 4.33838 16.3573 4.56587C16.2631 4.79336 16.1249 5.00006 15.9508 5.17417L11.4242 9.70083C11.2501 9.87495 11.1119 10.0816 11.0177 10.3091C10.9235 10.5366 10.875 10.7804 10.875 11.0267V13.4658C10.8751 13.8141 10.7781 14.1556 10.595 14.4519C10.4119 14.7482 10.1499 14.9876 9.83833 15.1433L7.125 16.5V11.0267C7.125 10.7804 7.07651 10.5366 6.98228 10.3091C6.88805 10.0816 6.74994 9.87495 6.57583 9.70083L2.04917 5.17417C1.87506 5.00006 1.73695 4.79336 1.64272 4.56587C1.54849 4.33838 1.5 4.09456 1.5 3.84834V2.97834C1.5 2.52834 1.82 2.14 2.26417 2.065C4.48964 1.68821 6.74286 1.49921 9 1.5Z"
                stroke="#667085"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{t("filter")}</span>
          </div>
          {isMenuOpen && (
            <ToggleMenu
              isMenuOpen={isMenuOpen}
              setMenuOpen={setMenuOpen}
              allColumns={allColumns}
              getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
              t={t}
              extraction={extraction}
            />
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
