import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
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
                    /*           justifySelf: "flex-end",
                              fontSize: "1rem",
                              border: "1.5px solid #818369",
                              borderRadius: "0.5rem",
                              outline: "none",
                              minHeight: "2rem",
                              width: "calc(100% )", */
                    width: "100%",
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
interface MultipleSelectChipProps {
    valueselct: any;
    selectedValueSelector: any;
    setSelectedValueSelector: any;
    otherValue: string;
}

export default function MultipleSelectChip({ valueselct, selectedValueSelector, setSelectedValueSelector, otherValue }: MultipleSelectChipProps) {
    const handleChange = (event: SelectChangeEvent<typeof selectedValueSelector>) => {
        const {
            target: { value },
        } = event;
        setSelectedValueSelector(
            value.includes('other')
                ? [...value.filter((val: string) => val !== 'other'), valueselct.find((group: any) => group.name === 'other')?.id]
                : value as unknown as number[]
        );
    };
    return (
        <div>
            <ThemeProvider theme={themeGeneral}>

                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Group</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={selectedValueSelector}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Groups" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value: any) => (
                                    <Chip key={value} label={valueselct.find((group: any) => group.id === value)?.name || ''} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {valueselct.map((group: any) => (
                            <MenuItem
                                key={group.id}
                                value={group.id}
                                style={{ backgroundColor: selectedValueSelector.includes(group.id) ? 'lightgray' : 'white' }}
                            >
                                {group.name}
                            </MenuItem>
                        ))}
                        <MenuItem value="other">
                            <em>Other...</em>
                        </MenuItem>
                    </Select>
                </FormControl>
            </ThemeProvider>

        </div>
    );
}