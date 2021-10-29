import { useCallback, useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { CircularProgress,  Paper, Typography } from "@mui/material";
import { ContactsTable } from "./ContactsTable";
import { Box } from "@mui/system";
import { ToggleMode } from "./ToggleMode";
import { ContactsFilter } from "./ContactsFilter";
import { GridContacts } from "./GridContacts";
import { Stastics } from "../../components/Stastics";
import { PaginationList } from "../../components/Pagination";

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
    filterPaper : {
        padding : '30px'
    },
    loader : {
        position : 'absolute',
        top : '30%',
        left : "40%",
        width : '500px',
        height : '500px'
    }
  
})
const DATA_MODE = {
    TABLE : 'TABLE',
    GRID : 'GRID'
}
const getMode = () => {
    return localStorage.getItem('mode') ||  DATA_MODE.TABLE;
}

//============= HERE ONLY FILTERS ===================================
const filterDefVal = {
    fullName : '',
    gender : 'all',
    nationality : 'all',
}


const filterByFullName = (name,fullName) => {
    return name.first.includes(fullName) 
        || name.last.toLowerCase().includes(fullName) 
}
const filterByGender = (userGender,gender) =>{
    if(gender === 'all'){
        return true;
    }
    return userGender === gender;
}

const filterByNationality = (userNat,filterNat) => {
    if(filterNat === 'all'){
        return true;
    }
    return filterNat === userNat;
}
// ===========================================================

export const Contacts = () => { 
    const pageSize = 12;
    const classes = useStyles();
    const[mode,setMode] = useState( getMode);
    const[contacts,setContacts] = useState([]);
    const[loading,setLoading] = useState(true);
    const[filters,setFilters]  = useState(filterDefVal);
    const[page,setPage] = useState(0);

    // GET CONTACTS 
    useEffect(() => {
        const getData = async() => {
            try{
                setLoading(true);
                const response = await fetch('https://randomuser.me/api/?results=200');
                const {results} = await response.json();
                setContacts(results);
                setLoading(false);
             
            }catch(e){
                setLoading(false);
               
            }
        }
        getData();
    },[]);
    

    

    const updateFilter = useCallback((name,value) => {
        setFilters({
            ...filters,
            [name] : value
        })
    },[filters])

    const onFilterClear = useCallback(() => {
        setFilters(filterDefVal);
    },[]);
    
   
    const getDataPart = (data) => {
        return data.slice(
            page * pageSize,
             Math.min(data.length,
            (page +1) * pageSize)); 
    }
    
 

    const filteredData = contacts
    .filter((obj) => filterByFullName(obj.name,filters.fullName))
    .filter((obj) => filterByGender(obj.gender,filters.gender)) 
    .filter((obj) => filterByNationality(obj.nat,filters.nationality))
    
    const dataPart = getDataPart(filteredData);

    return(
            <div className = {classes.root} >
                <Grid container >
                    <Grid item xs = {12} mb={5} >
                        <Box display='flex'   justifyContent='space-between'>
                            <Typography  component = 'h3' >
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
                        
                        <Paper elevation = {5} className = {classes.filterPaper}>
                            <ContactsFilter
                
                            onFilterClear = {onFilterClear}
                            updateFilter = {updateFilter} 
                            filters = {filters}/>
                        </Paper>
                    </Grid>
                    <Grid item xs = {12}>
                        {
                            loading ?<CircularProgress  size={200} className = {classes.loader} />: 
                            mode === DATA_MODE.TABLE 
                            ? <>
                            <ContactsTable data = {dataPart}/>
                            <Stastics data = {contacts}/>
                            </>
                            : <>
                            <GridContacts data = {dataPart}/> 
                            <Stastics data = {contacts}/>

                            </>
                        }
                        
                    </Grid>
                    {/* STATISTICS OF DATA */}
                   
                    {/* PAGINATION */}
                    <PaginationList 
                    page = {page} 
                    setPage = {setPage} 
                    len = {filteredData.length}/>
                </Grid>
            </div>
       
    )
}