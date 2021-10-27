import { Box } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { NATIONALITY_HUMAN_NAME } from "../../../constants/nationality";
import { Clear } from "@mui/icons-material";


const useStyles = makeStyles({
    FormControls: {
        width: '220px',
    },
    searchField:{
        width : '500px'
    }

})

export const ContactsFilter = ({ filters, updateFilter, onFilterClear }) => {
    const classes = useStyles();
    const handleChangeFilter = (e) => {
        updateFilter(e.target.name, e.target.value);
    }
    return (
        <Box display='flex' justifyContent='space-between'>
            <Box display='flex' >
                <Box mr = {5}>
                    <TextField
                        className = {classes.searchField}
                        name='fullName'
                        label='FullName'
                        value={filters.fullName}
                        onChange={handleChangeFilter}
                        variant='standard'
                        placeholder = 'Search by full Name'
                    />
                </Box>

                <Box mr = {5}>
                <FormControl variant='standard' className={classes.FormControls}>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                        name='gender'
                        labelId="gender"
                        value={filters.gender}
                        label="Gender"
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <FormControl variant='standard' className={classes.FormControls}>
                    <InputLabel id="nationality">Nationality</InputLabel>
                    <Select
                        name='nationality'
                        labelId="nationality"
                        value={filters.nationality}
                        label="Nationality"
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        {
                            Object.keys(NATIONALITY_HUMAN_NAME).map((nat, i) => {
                                return (
                                    <MenuItem key={nat + i} value={nat}>{NATIONALITY_HUMAN_NAME[nat]}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Box>
            <Button
                onClick={onFilterClear}
                variant='contained'
                color='primary'
                startIcon={<Clear />}
            >
                Clear
            </Button>
        </Box>
    )
}