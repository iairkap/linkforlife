import React from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

interface SelectorProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: string[];
    id: string
}

function Selector({ value, onChange, options, id }: SelectorProps) {
    const handleChange = (event: SelectChangeEvent<typeof value>) => {
        onChange(event.target.value as string[]);
    };

    const theme = createTheme({
        direction: 'rtl',
    });

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <FormControl sx={{ width: "100%", border: "0.5px solid #545454", borderRadius: "8px" }}>
                    <InputLabel id={`label-${id}`}>{id}</InputLabel>
                    <Select
                        id={id}
                        multiple
                        value={value}
                        onChange={handleChange}
                        input={<OutlinedInput id={`select-${id}`} label={id} />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default Selector;