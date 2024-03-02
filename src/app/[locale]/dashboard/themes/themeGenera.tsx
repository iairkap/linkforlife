import { createTheme } from '@mui/material/styles';


export const themeGeneralA = createTheme({
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