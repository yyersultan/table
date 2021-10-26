import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Typography } from "@mui/material";
import { ContactsTable } from "./ContactsTable";
import { Box } from "@mui/system";

import { ToggleMode } from "./ToggleMode";


const useStyles = makeStyles({
    root : {
        
        margin:'30px'
          
    },
    headContainer : {
        marginBottom : '30px'
    }
    
})

const DATA_MODE = {
    TABLE : 'TABLE',
    GRID : 'GRID'
}

const getMode = () => {
    return localStorage.getItem('mode') ||  DATA_MODE.TABLE;
}

export const Contacts = () => { 
    const classes = useStyles();
    const[mode,setMode] = useState( getMode);
    const[contacts,setContacts] = useState([]);
    const[loading,setLoading] = useState(true);
    const[isError,setError] = useState( false);

    useEffect(() => {
        const getData = async() => {
            try{
                setLoading(true);
                const response = await fetch('https://randomuser.me/api/?results=100');
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

    
    
   
    if(isError){
        return <div>Error</div>
    }
    
    return(
    
            <div className = {classes.root} >
                <Grid container >
                    <Grid item xs = {12} >
                        <Box display='flex' className  ={classes.headContainer} justifyContent='space-between'>
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
                    <Grid item xs = {12}>
                        {
                            loading ?<CircularProgress />: 
                            mode === DATA_MODE.TABLE 
                            ? <ContactsTable data = {contacts}/>
                            : <div>GRID MODE</div>
                        }
                        
                    </Grid>
                </Grid>
            </div>
       
    )
}