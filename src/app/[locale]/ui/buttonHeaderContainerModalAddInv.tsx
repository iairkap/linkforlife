import React from 'react';
import "../sass/components/headerModalAddInv.scss"


function ButtonHeaderModal({ handleClickSwitch, setAddInvCouple, setAddInvOnePerson, setAddInvFamily, t }: any) {
    return (
        <header className='headerModalButtonContainer'>
            <button className='buttonModal' onClick={() => handleClickSwitch('one', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>{t("oneGuest")}</button>
            <button className='buttonModal' onClick={() => handleClickSwitch('couple', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>{t("couple")}</button>
            <button className='buttonModal' onClick={() => handleClickSwitch('family', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>{t("family")}</button>
        </header>
    );
}

export default ButtonHeaderModal;