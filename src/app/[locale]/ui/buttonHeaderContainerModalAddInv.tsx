import React from 'react';

function ButtonHeaderModal({ handleClickSwitch, setAddInvCouple, setAddInvOnePerson, setAddInvFamily, t }: any) {
    return (
        <header>
            <button onClick={() => handleClickSwitch('one', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>One Person</button>
            <button onClick={() => handleClickSwitch('couple', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>Couple</button>
            <button onClick={() => handleClickSwitch('family', setAddInvCouple, setAddInvOnePerson, setAddInvFamily,)}>Family</button>
        </header>
    );
}

export default ButtonHeaderModal;