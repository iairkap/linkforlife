import React, { useEffect } from 'react';
import DropDown from './dropDown';
import { useTranslations } from 'next-intl';
import "../sass/components/menuFilter.scss"




function ToggleMenu({ setMenuOpen, isMenuOpen, getToggleHideAllColumnsProps, allColumns, t, extraction }: any) {

    useEffect(() => {
        const closeMenu = () => {
            setMenuOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        };

        document.addEventListener('click', closeMenu);
        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listeners when the component unmounts
        return () => {
            document.removeEventListener('click', closeMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setMenuOpen]);

    return (
        <section className={`menu-dropdownda ${isMenuOpen ? 'openda ' : ''} ${extraction === 'he' ? 'menu-dropdownda-he' : 'menu-dropdownda-en-es'}`}>
            <div className='menuOpenContainer'>
                <input
                    type="checkbox"
                    {...getToggleHideAllColumnsProps()}
                    id="toggle-all"
                />
                <label htmlFor="toggle-all">{t("togleAll")}</label>
            </div>
            {allColumns.map((column: any) => (
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
        </section>
    );
}

export default ToggleMenu;