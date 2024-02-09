export const getListItems = (setIsOpenModalAddUser: any, setIsOpen: any, signOut: any) => [
    {
        symbol: "settings_heart",
        text: "הגדרות",
        onClick: () => { }
    },
    {
        symbol: "group",
        text: "שיתוף חתונה",
        onClick: () => { setIsOpenModalAddUser(true); setIsOpen(false); }
    },
    {
        symbol: "help",
        text: "עזרה",
        onClick: () => { }
    },
    {
        symbol: "logout",
        text: "התנתק",
        onClick: () => signOut({ callbackUrl: "/" })
    }
];