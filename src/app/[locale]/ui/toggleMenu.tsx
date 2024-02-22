import React from 'react';
import DropDown from './dropDown';
import { useTranslations } from 'next-intl';
import "../sass/components/menuFilter.scss"
function ToggleMenu({ setMenuOpen, isMenuOpen, getToggleHideAllColumnsProps, allColumns, t, extraction }) {

    console.log(allColumns)


    return (
        <DropDown isOpen={isMenuOpen} extraction={extraction}>
            <div className='menuOpenContainer'>
                <input
                    type="checkbox"
                    {...getToggleHideAllColumnsProps()}
                    id="toggle-all"
                />
                <label htmlFor="toggle-all">{t("togleAll")}</label>
            </div>
            {allColumns.map((column) => (
                <div key={column.id} className='togglecontainer'>
                    <label>
                        <input
                            type="checkbox"
                            {...column.getToggleHiddenProps()}
                            id={`checkbox-${column.id}`}
                        />
                        <label htmlFor={`checkbox-${column.id}`}>
                            {column.id === "selection" ? "Select" : column.Header}
                        </label>
                    </label>
                </div>
            ))}
        </DropDown>
    );
}

export default ToggleMenu;