import React from 'react';
import "../sass/components/headerModalAddInv.scss"


function ButtonHeaderModal({ handleClickSwitch, setAddInvCouple, setAddInvOnePerson, setAddInvFamily, t }: any) {
    return (
        <header className='headerModalButtonContainer'>
            <button className='buttonModal' onClick={() => handleClickSwitch('one', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>One Person</button>
            <button className='buttonModal' onClick={() => handleClickSwitch('couple', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>Couple</button>
            <button className='buttonModal' onClick={() => handleClickSwitch('family', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>Family</button>
        </header>
    );
}

export default ButtonHeaderModal;