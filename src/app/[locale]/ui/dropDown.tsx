import React from 'react';
import "../sass/components/dropdown.scss"


interface DropDownProps {
    children: any;
    isOpen: boolean;
    extraction: string | undefined;
}


function DropDown({ children, isOpen, extraction }: DropDownProps) {

    console.log(extraction)

    return (
        <section className={`menu-dropdown ${isOpen ? 'open' : ''} ${extraction === 'he' ? 'menu-dropdown-he' : 'menu-dropdown-en-es'}`}>
            {children}
        </section>
    );
}
export default DropDown;