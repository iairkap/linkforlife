/* import React from "react";
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
        components: {

        }


    });

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <FormControl />
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
                    sx={{ '& .MuiOutlinedInput-root': { borderColor: '#A86869;' } }}

                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </ThemeProvider>
        </CacheProvider>


    );
}

export default Selector; */



import React, { useState, useEffect } from 'react';
import "../sass/components/selector.scss"

interface MultiSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: string[];
    id: string;
    span: string;
}

function MultiSelect({ value, onChange, options, id, span }: MultiSelectProps) {
    const [selectedOptions, setSelectedOptions] = useState(value || []);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSelectedOptions(value);
    }, [value]);

    const handleSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            handleRemove(option);
        } else {
            const newOptions = [...selectedOptions, option];
            setSelectedOptions(newOptions);
            onChange(newOptions);
        }
        setIsOpen(false)
    };

    const handleRemove = (option: string) => {
        const newOptions = selectedOptions.filter(o => o !== option);
        setSelectedOptions(newOptions);
        onChange(newOptions);
    };

    return (
        <div className='selector-containerbis' onClick={() => setIsOpen(!isOpen)}>
            <div className='fafa'>
                {selectedOptions.length === 0 && <span className='first-display'>{span}</span>}
                {selectedOptions.map(option => (
                    <div key={option} className='optionContainerB'>
                        <span className='options-chip'>
                            {option}
                        </span>
                    </div>
                ))}
            </div>

            <div className='container-drop'>
                {isOpen && (
                    <div className='optionContainer'>
                        {options.map(option => (
                            <div key={option} onClick={() => handleSelect(option)} className={selectedOptions.includes(option) ? 'optionContainerSelected' : 'optionContainer'}>
                                <h4 className='options'> {option}
                                </h4>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MultiSelect; 