import React, { useState } from "react";
import "../sass/components/searchBarTable.scss";
import { useTranslations } from "next-intl";
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [isVisible, setIsVisible] = useState(true);
  const [value, setValue] = useState(globalFilter);
  const t = useTranslations("SearchBar");

  return (
    <div className="search-cont">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`${t("search")}...`}
        className="searchInput-f"
      />
      <button className="search-icon">
        <span class="material-symbols-outlined searchicon">{t("search")}</span>
      </button>
    </div>
  );
}

export default GlobalFilter;
