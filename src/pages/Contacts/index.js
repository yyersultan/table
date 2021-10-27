import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Typography } from "@mui/material";
import { ContactsTable } from "./ContactsTable";
import { Box } from "@mui/system";

import { ToggleMode } from "./ToggleMode";
import { ContactsFilter } from "./ContactsFilter";




const useStyles = makeStyles({
    root : {
       padding:'30px'        
    },
    headContainer : {
        marginBottom : '30px'
    },
    filtersContainer : {
        marginBottom : '30px'
    },
})

const DATA_MODE = {
    TABLE : 'TABLE',
    GRID : 'GRID'
}

const getMode = () => {
    return localStorage.getItem('mode') ||  DATA_MODE.TABLE;
}

const filterDefVal = {
    fullName : '',
    gender : '',
    nationality : '',
}

const filterByFullName = (name,fullName) => {
    return name.first.includes(fullName) 
        || name.last.toLowerCase().includes(fullName) 
}
const filterByGender = (userGender,gender) =>{
    if(gender === ''){
        return true;
    }
    return userGender === gender;
}

export const Contacts = () => { 
    const classes = useStyles();
    const[mode,setMode] = useState( getMode);
    const[contacts,setContacts] = useState([]);
    const[loading,setLoading] = useState(true);
    const[isError,setError] = useState( false);
    const[filters,setFilters]  = useState(filterDefVal);



    useEffect(() => {
        const getData = async() => {
            try{
                setLoading(true);
                const response = await fetch('https://randomuser.me/api/?results=10');
                const {results} = await response.json();
                setContacts(results);
                setLoading(false);
                setError(false);
            }catch(e){
                setLoading(false);
                setError(e);
            }
        }
        getData();
    },[]);

    const updateFilter = (name,value) => {
        setFilters({
            ...filters,
            [name] : value
        })
    }
    
   
    if(isError){return <div>Error</div>}

    const filteredData = contacts
    .filter((obj) => filterByFullName(obj.name,filters.fullName))
    .filter((obj) => filterByGender(obj.gender,filters.gender)) 
    

    return(
            <div className = {classes.root} >
                <Grid container >
                    <Grid item xs = {12} mb={5} >
                        <Box display='flex'   justifyContent='space-between'>
                            <Typography variant='h3' component = 'h3' >
                                Contacts
                            </Typography>
                            <ToggleMode 
                            mode = {mode}
                            setMode = {setMode}
                            GRID = {DATA_MODE.GRID}
                            TABLE = {DATA_MODE.TABLE}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs = {12} mb={5}>
                        <ContactsFilter
                        updateFilter = {updateFilter} 
                        filters = {filters}/>
                    </Grid>
                    <Grid item xs = {12}>
                        {
                            loading ?<CircularProgress />: 
                            mode === DATA_MODE.TABLE 
                            ? <ContactsTable data = {filteredData}/>
                            : <div>GRID MODE</div>
                        }
                        
                    </Grid>
                </Grid>
            </div>
       
    )
}