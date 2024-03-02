import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from "@mui/material";
import axios from 'axios';

export const themeGeneral = createTheme({
    palette: {
        action: {
            active: "#818369",
            focus: "#818369",
        },
        secondary: {
            main: "#818369"
        }

    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    width: "100%"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    padding: "0px",
                    width: "100%"
                }
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    padding: "0px",
                    flexDirection: "row-reverse",

                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    padding: "0px",
                    borderColor: "",
                    borderWidth: "0px",
                    borderRadius: "0rem",
                    '&.Mui-focused': {
                        borderColor: 'yellow !important',
                    },
                },
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#blue',
                        borderWidth: "0px",
                        borderBottomWidth: "1px",
                    },

                    '&.Mui-focused fieldset': {
                        borderColor: 'yellow',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#bbbda0', // Cambia esto al color que desees
                        /*      top: "-10px",
                             left: "-10px" */
                    },
                    "&.Mui-error": {
                        color: "#DB6C6F",
                        /*      top: "-10px",
                             left: "-10px" */

                    }
                },


            },
        },
    },
});

export default function FreeSolo({ userInvitationList, value, onChange, readOnly, initialChairNames, fa }: any) {
    const [active, setActive] = React.useState(false);
    const [hover, setHover] = React.useState(false);

    // Map userInvitationList to a list of objects with full names
    const userInvitationListWithFullNames = userInvitationList.map((option) => ({
        fullName: `${option.name} ${option.lastName}`,
        ...option
    }));

    // Remove trailing spaces from initialChairNames
    const trimmedInitialChairNames = initialChairNames.map(name => name.trim());

    // Filter userInvitationListWithFullNames to exclude names that are already in initialChairNames
    const filteredUserInvitationList = userInvitationListWithFullNames.filter((option) => !trimmedInitialChairNames.includes(option.fullName));

    console.log(value)
    console.log(fa)

    return (
        <ThemeProvider theme={themeGeneral}>
            {readOnly ? (
                <TextField value={value} />
            ) : (
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    value={value}
                    onChange={(event, newValue) => {
                        onChange({
                            target: { value: newValue },
                        });

                        const selectedInvitation = userInvitationListWithFullNames.find((option) => option.fullName === newValue);
                        if (selectedInvitation) {
                            axios.patch('/api/addGuestToTable', {
                                tableId: fa, // You need to pass the table id to FreeSolo
                                weddingInvitationID: selectedInvitation.id,
                            })
                                .then(response => {
                                    console.log(response.data);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }
                    }}
                    options={filteredUserInvitationList.map((option) => option.fullName)}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    renderInput={(params) => <TextField {...params} label={active ? "Add Guest" : (hover ? "Click here to add a guest" : "")} />}
                />
            )}
        </ThemeProvider>
    );
}