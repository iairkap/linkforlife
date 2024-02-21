import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";


/* MuiFormControl-root MuiTextField-root css-z3c6am-MuiFormControl-root-MuiTextField-root
 */
const theme = createTheme({
    palette: {
        action: {
            active: "#818369",
            focus: "#818369",
        }

    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    justifySelf: "flex-end",
                    fontSize: "1rem",
                    border: "1.5px solid #818369",
                    borderRadius: "0.5rem",
                    outline: "none",
                    minHeight: "2rem",
                    width: "calc(100% - 23px)",

                }

            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
/*                     width: "calc(100% - 43px)",
 */                    flexDirection: "row-reverse",
                },
            },
        },

    },
});

export default function DatePickerMaterialUI({ date, onChange }: any) {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={date}
                    onChange={onChange}
                    sx={{ borderColor: "red" }}
                    renderInput={(props: any) => <TextField {...props} />}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}