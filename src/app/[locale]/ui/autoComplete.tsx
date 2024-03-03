import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from "@mui/material";
import axios from 'axios';
import { themeGeneralA } from '../dashboard/themes/themeGenera';


export default function FreeSolo({ userInvitationList, value, onChange, readOnly, initialChairNames, fa, setUserInvitationList }: any) {
    const [active, setActive] = React.useState(false);
    const [hover, setHover] = React.useState(false);

    const userInvitationListWithFullNames = userInvitationList
        .filter((option: any) => option.tableId === null) // Exclude invitations that already have a tableId
        .map((option: any) => ({
            fullName: `${option.name} ${option.lastName}`,
            ...option
        }));

    const trimmedInitialChairNames = initialChairNames.map((name: string) => name.trim());
    const filteredUserInvitationList = userInvitationListWithFullNames.filter((option: any) => !trimmedInitialChairNames.includes(option.fullName));

    return (
        <ThemeProvider theme={themeGeneralA}>
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

                        const selectedInvitation = userInvitationListWithFullNames.find((option: any) => option.fullName === newValue);
                        if (selectedInvitation) {
                            axios.patch('/api/addGuestToTable', {
                                tableId: fa, // You need to pass the table id to FreeSolo
                                weddingInvitationID: selectedInvitation.id,
                            })
                                .then(response => {

                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }
                    }}
                    options={filteredUserInvitationList.map((option: any) => option.fullName)}
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