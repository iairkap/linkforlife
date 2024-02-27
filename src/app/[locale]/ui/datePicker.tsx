import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";


/* MuiFormControl-root MuiTextField-root css-z3c6am-MuiFormControl-root-MuiTextField-root
 */
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
        MuiInputBase: {
            styleOverrides: {
                root: {
                    /*           justifySelf: "flex-end",
                              fontSize: "1rem",
                              border: "1.5px solid #818369",
                              borderRadius: "0.5rem",
                              outline: "none",
                              minHeight: "2rem",
                              width: "calc(100% )", */
                    width: "100%"

                }

            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    flexDirection: "row-reverse",
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: "#818369",
                    borderWidth: "1.5px",
                    borderRadius: "0.5rem",
                    '&.Mui-focused': {
                        borderColor: 'yellow !important',
                    },
                },
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#818369', // Cambia esto al color que desees
                        borderWidth: '2px', // Cambia esto al ancho que desees
                        // Agrega aquí cualquier otro estilo que desees
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

export default function DatePickerMaterialUI({ date, onChange }: any) {


    return (
        <ThemeProvider theme={themeGeneral}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={date}
                    onChange={onChange}
                    label="Wedding Date"

                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}