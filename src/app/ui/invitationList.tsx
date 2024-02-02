import React from 'react';
import { useMemo, useState } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from "material-react-table";
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    lighten,
} from "@mui/material";
import {
    CompassCalibrationTwoTone,
    Email,
    WhatsApp,
} from "@mui/icons-material";
import { AccountCircle, Send } from "@mui/icons-material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";


function TableInvitationList({ userInvitationList, isLoading, setIsLoading, groups, groupInvitations }: { userInvitationList: Array<object>, isLoading: boolean, setIsLoading: Function }) {




    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreenToggle = () => {
        setIsFullScreen(!isFullScreen);
    };

    const rowActions = useMemo(
        () => [
            {
                id: "email",
                label: "Send Email",
                icon: <Email />,
                onClick: (row: any) => {

                },
            },
            {
                id: "whatsapp",
                label: "Send WhatsApp",
                icon: <WhatsApp />,
                onClick: (row: any) => {

                },
            },
        ],
        []
    );
    const columns = useMemo(
        () => [
            {
                id: "Name",
                header: "Name",
                columns: [
                    {
                        accessorFn: (row: any) => `${row.name} ${row.lastName}`,
                        id: "name",
                        header: "Name",
                        size: 200,

                    },
                    {
                        accessorKey: "emailInvitation",
                        enableClickToCopy: true,
                        filterVariant: "autocomplete",
                        header: "Email",
                        size: 150,
                    },
                    {
                        accessorKey: "phoneNumber",
                        header: "Numero de telefono",
                        size: 150,
                    },
                    {
                        accessorKey: "invitedBy",
                        header: "invited by",
                        size: 150,
                    },

                    {
                        id: 'groups',
                        header: 'Groups',
                        accessorFn: (row: any) => {
                            // Asegúrate de que 'row.groups' es un array que contiene los grupos a los que pertenece el usuario
                            return row.groups.map((group: any) => group.name).join(', ');
                        },
                        size: 200,
                    },



                    {
                        id: 'isAttending',
                        Header: () => (
                            <div style={{ textAlign: 'center' }}>
                                Asistirá
                            </div>
                        ),
                        accessor: 'isAttending',
                        Cell: ({ value }: any) => (
                            <div style={{ textAlign: 'center' }}>
                                {value ? '✔️' : 'x'}
                            </div>
                        ),
                    },
                    {
                        id: 'isConfirmed',
                        Header: () => (
                            <div style={{ textAlign: 'center' }}>
                                RSVP FORM
                            </div>
                        ),
                        accessor: 'isConfirmed',
                        Cell: ({ value }) => (
                            <div style={{ textAlign: 'center' }}>
                                {value ? '✔️' : 'x'}
                            </div>
                        ),
                    },

                ],
            },
        ],
        []
    );
    const globalTheme = useTheme();

    const tableTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    text: {
                        primary: "#000",
                        secondary: "#000",
                    },

                    primary: {
                        main: "#101934",
                    },
                    info: {
                        main: "#A61C4F",
                    },
                    secondary: {
                        main: "#A61C4F", // Reemplaza 'yourSecondaryColor' con el color que desees
                    },
                    background: {
                        default:
                            globalTheme.palette.mode === "light" ? "#F2F2F2" : "#F2F2F2",
                    },
                },

                typography: {
                    button: {
                        textTransform: "none", //customize typography styles for all buttons in table by default
                        fontSize: "1.4rem",
                        fontFamily: "Poppins",
                        color: "black",
                    },
                },
                components: {
                    MuiTooltip: {
                        styleOverrides: {
                            tooltip: {
                                fontSize: "1.1rem",
                                color: "black",
                                //override to make tooltip font size larger
                            },
                        },
                    },
                    MuiSvgIcon: {
                        styleOverrides: {
                            root: {
                                color: "black",
                            },
                        },
                    },
                    MuiList: {
                        styleOverrides: {
                            root: {
                                backgroundColor: "rgba(166, 28, 79, 0.30)",
                                width: "15rem",
                            },
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                boxShadow: "none",
                            },
                        },
                    },
                    /*       MuiPopover: {
                              styleOverrides: {
                                  paper: {
                                      left: '1200px !important',
                                  },
                              },
                          }, */
                    MuiChip: {
                        styleOverrides: {
                            colorPrimary: {
                                backgroundColor: "transparent",
                                color: "black",
                                fontFamily: "Roboto",
                                border: "1px solid black",
                            },
                        },
                    },
                    MuiIcon: {
                        styleOverrides: {
                            root: {
                                color: "black", // Esto hará que todos los iconos sean blancos
                            },
                        },
                    },
                    MuiInput: {
                        styleOverrides: {
                            underline: {
                                borderColor: "black", // Esto hará que las líneas del buscador sean blancas
                                "&:before": {
                                    borderBottomColor: "black", // Esto hará que las líneas del buscador sean blancas
                                },
                            },
                        },
                    },
                    MuiTableCell: {
                        styleOverrides: {
                            root: {
                                "&.Mui-selected": {
                                    backgroundColor: "#A61C4F",
                                },
                                fontWeight: "900",
                                color: "black",
                                backgroundColor: "#F2F2F2",
                            },
                        },
                    },
                    MuiSelect: {
                        styleOverrides: {
                            root: {
                                selected: {
                                    backgroundColor: "red",
                                },
                            },
                        },
                    },
                    MuiCheckbox: {
                        styleOverrides: {
                            root: {
                                color: "black",
                            },
                        },
                    },

                    MuiAlert: {
                        styleOverrides: {
                            root: {
                                backgroundColor: "#A61C4F",
                                fontFamily: "Roboto",
                                fontWeight: "900",
                                color: "black", // Cambia el color de fondo del encabezado a negro
                            },
                        },
                    },

                    MuiSwitch: {
                        styleOverrides: {
                            thumb: {
                                color: "000000", //change the color of the switch thumb in the columns show/hide menu to pink
                            },
                        },
                    },
                    MuiTableRow: {
                        styleOverrides: {
                            root: {
                                selected: {
                                    backgroundColor: "red",
                                },
                            },
                        },
                    },
                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {},
                        },
                    },
                },
            }),

        [globalTheme]
    );

    const options = {
        muiTablePaperProps: {
            style: {
                zIndex: 1000, // Cambia este valor al zIndex que necesitas
            },
        },
    };
    const table = useMaterialReactTable({
        columns,
        data: userInvitationList,


        rowActions,
        enableColumnFilterModes: false,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        enableRowActions: true,
        enableRowSelection: true,
        enableFullScreenToggle: true,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: false,

            pagination: {
                pageSize: 8,
            },
            density: "spacious",
        },
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        muiSearchTextFieldProps: {
            size: "small",
            variant: "outlined",
        },
        muiPaginationProps: {
            color: "secondary",
            rowsPerPageOptions: [8, 20, 30],
            shape: "rounded",
            variant: "outlined",
        },


        renderRowActionMenuItems: ({ closeMenu }) => [
            <MenuItem
                key="email"
                onClick={() => {
                    closeMenu();
                }}
            >
                <ListItemIcon>
                    <Email />
                </ListItemIcon>
                Send Email
            </MenuItem>,
            <MenuItem
                key="whatsapp"
                onClick={() => {
                    closeMenu();
                }}
            >
                <ListItemIcon>
                    <WhatsApp />
                </ListItemIcon>
                Send WhatsApp
            </MenuItem>,
        ],
    });



    return (
        <div style={{ width: "100%", zIndex: isFullScreen ? 9999 : "auto" }}>
            <ThemeProvider theme={tableTheme}>
                <MaterialReactTable table={table} />
            </ThemeProvider>
        </div>
    );
}

export default TableInvitationList;