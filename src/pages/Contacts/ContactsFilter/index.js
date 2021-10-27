import { Box } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    FormControls: {
        width: '220px'
    }
})

export const ContactsFilter = ({ filters, updateFilter }) => {
    const classes = useStyles();
    const handleChangeFilter = (e) => {
        updateFilter(e.target.name, e.target.value);
    }
    return (
        <Box display='flex'>

            <TextField
                name='fullName'
                label='FullName'
                value={filters.fullName}
                onChange={handleChangeFilter}
                variant='standard'
                 />


            <FormControl variant='standard' className={classes.FormControls}>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                    name='gender'
                    labelId="gender"
                    value={filters.gender}
                    label="Gender"
                    onChange={handleChangeFilter}
                >
                    <MenuItem value={''}>All</MenuItem>
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant='standard' className={classes.FormControls}>
                <InputLabel id="nationality">Nationality</InputLabel>
                <Select
                    name='nationality'
                    labelId="nationality"
                    value={filters.nationality}
                    label="Nationality"
                    onChange={handleChangeFilter}
                >
                    <MenuItem value={''}>All</MenuItem>
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}