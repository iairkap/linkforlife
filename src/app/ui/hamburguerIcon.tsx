import React from 'react';
import "../sass/components/hamburguerIcon.scss"

export default function HamburguerIcon() {
    return (
        <>
            <input id="toggleChecker" type="checkbox" />
            <label id="togglerLable" htmlFor="toggleChecker">
                <div className="checkboxtoggler">
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                    <div className="line-3"></div>
                </div>
            </label>
        </>
    );
}