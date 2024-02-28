export const handleClickSwitch = (type: string, setAddInvCouple: (value: boolean) => void, setAddInvOnePerson: (value: boolean) => void, setAddInvFamily: (value: boolean) => void) => {
    switch (type) {
        case 'one':
            setAddInvOnePerson(true);
            setAddInvCouple(false);
            setAddInvFamily(false);
            break;
        case 'couple':
            setAddInvOnePerson(false);
            setAddInvCouple(true);
            setAddInvFamily(false);
            break;
        case 'family':
            setAddInvOnePerson(false);
            setAddInvCouple(false);
            setAddInvFamily(true);
            break;
        default:
            break;
    }
};