import 'react-international-phone/style.css';

import {
    BaseTextFieldProps,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import {
    CountryIso2,
    defaultCountries,
    FlagImage,
    parseCountry,
    usePhoneInput,
} from 'react-international-phone';
import { createTheme, ThemeProvider } from "@mui/material";


const themeGeneral = createTheme({
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
                    width: "100%",
                }

            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    flexDirection: "row-reverse",
                    width: "100%",
                    margin: "0px",
                    height: "100%"
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface MUIPhoneProps extends BaseTextFieldProps {
    value: string;
    onChange: (phone: string) => void;
}

export const MuiPhone: React.FC<MUIPhoneProps> = ({
    value,
    onChange,
    ...restProps
}) => {
    const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
        usePhoneInput({
            defaultCountry: 'il',
            value,
            countries: defaultCountries,
            onChange: (data) => {
                onChange(data.phone);
            },
        });

    return (


        <>
            <ThemeProvider theme={themeGeneral}>

                <TextField
                    variant="outlined"
                    label="Phone number"
                    color="primary"
                    placeholder="Phone number"
                    value={inputValue}
                    onChange={handlePhoneValueChange}
                    type="tel"
                    inputRef={inputRef}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                style={{ marginRight: '2px', marginLeft: '-8px' }}
                            >
                                <Select
                                    MenuProps={{
                                        style: {
                                            height: '300px',
                                            width: '360px',
                                            top: '10px',
                                            left: '-34px',
                                        },
                                        transformOrigin: {
                                            vertical: 'top',
                                            horizontal: 'left',
                                        },
                                    }}
                                    sx={{
                                        width: 'max-content',
                                        // Remove default outline (display only on focus)
                                        fieldset: {
                                            display: 'none',
                                        },
                                        '&.Mui-focused:has(div[aria-expanded="false"])': {
                                            fieldset: {
                                                display: 'block',
                                            },
                                        },
                                        // Update default spacing
                                        '.MuiSelect-select': {
                                            padding: '8px',
                                            paddingRight: '24px !important',
                                        },
                                        svg: {
                                            right: 0,
                                        },
                                    }}
                                    value={country.iso2}
                                    onChange={(e) => setCountry(e.target.value as CountryIso2)}
                                    renderValue={(value) => (
                                        <FlagImage iso2={value} style={{ display: 'flex' }} />
                                    )}
                                >
                                    {defaultCountries.map((c) => {
                                        const country = parseCountry(c);
                                        return (
                                            <MenuItem key={country.iso2} value={country.iso2}>
                                                <FlagImage
                                                    iso2={country.iso2}
                                                    style={{ marginRight: '8px' }}
                                                />
                                                <Typography marginRight="8px">{country.name}</Typography>
                                                <Typography color="gray">+{country.dialCode}</Typography>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </InputAdornment>
                        ),
                    }}
                    {...restProps}
                />
            </ThemeProvider>

        </>
    );
};