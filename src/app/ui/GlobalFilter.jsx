import React, { useState } from "react";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [isVisible, setIsVisible] = useState(true);
  const [value, setValue] = useState(globalFilter);

  return (
    <div className="search-container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <button className="search">
        <span class="material-symbols-outlined searchicon">search</span>
      </button>
      <span>
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            setGlobalFilter(e.target.value || undefined);
          }}
          placeholder={`חיפוש`}
          className="searchInput visible"
        />
      </span>
    </div>
  );
}

export default GlobalFilter;
