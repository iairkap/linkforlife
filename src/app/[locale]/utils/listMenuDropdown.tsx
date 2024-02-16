export const getListItems = (setIsOpenModalAddUser: any, setIsOpen: any, signOut: any, t: any) => [
    {
        symbol: "settings_heart",
        text: t("settings"),
        onClick: () => { }
    },
    {
        symbol: "group",
        text: t("invite"),
        onClick: () => { setIsOpenModalAddUser(true); setIsOpen(false); }
    },
    {
        symbol: "help",
        text: t("help"),
        onClick: () => { }
    },
    {
        symbol: "logout",
        text: t("logout"),
        onClick: () => signOut({ callbackUrl: "/" })
    }
];