import React from 'react';
import "../sass/components/dropdown.scss"


interface DropDownProps {
    children: any;
    isOpen: boolean;
}


function DropDown({ children, isOpen }: DropDownProps) {
    return (
        <section className={`menu-dropdown ${isOpen ? 'open' : ''}`}>
            {children}
        </section>
    );
}
export default DropDown;