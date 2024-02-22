export const getListItems = (setIsOpenModalAddUser: any, setIsOpen: any, signOut: any, t: any, Link?: any) => [
    {
        symbol: "settings_heart",
        text: t("settings"),
        onClick: () => { },
        Link: "./settings"
    },
    {
        symbol: "group",
        text: t("invite"),
        onClick: () => { setIsOpenModalAddUser(true); setIsOpen(false); }
    },
    {
        symbol: "help",
        text: t("help"),
        onClick: () => { },
        Link: "./help"

    },
    {
        symbol: "logout",
        text: t("logout"),
        onClick: () => signOut({ callbackUrl: "/" })
    }
];