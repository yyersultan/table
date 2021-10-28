import {  Paper, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { memo } from "react";
import { NATIONALITY_HUMAN_NAME } from "../../constants/nationality";


const useStyles = makeStyles({
    root : {
        padding : '20px',
        width : '100%',
        marginTop: '10px'
    },
    userLenGender: {
        display : 'flex',
        
    },
    natStastics : {
        marginTop : '10px',
        
    }
    

})

export const Stastics = memo(({data}) => {
    const classes = useStyles();
    const nationalityList = data.map((el) => el.nat);
    const countNat = (natList) => {
        const d = {};
        for(let i = 0;i < natList.length;i ++){
            if(natList[i] in d){
                d[natList[i]] ++;
            }else{
                d[natList[i]] = 1;
            }
        }
        return d
    }
    const natObj = countNat(nationalityList);
    const getGender = (gender) => {
        let ans = 0;
        data.forEach((el,i) => {
            if(el.gender === gender){
                ans ++;
            }
        })
        return ans;
    }

    

    return (
        <Paper className = {classes.root}>
           <Typography component = 'h3'>
               Stastics
            </Typography> 
            <Box  className = {classes.userLenGender} >
                
                <Typography color = {'darkgray'}>
                    Collection size 
                    <h3>{data.length}</h3>
                </Typography>

                <Typography ml ={3} mr = {3} color = {'darkgray'}>
                    Males 
                    <h3>{getGender('male')}</h3>
                </Typography>

                <Typography color = {'darkgray'}>
                    Females
                    <h3>{getGender('female')}</h3> 
                </Typography>

            </Box>
            <Box className = {classes.natStastics}>
                <Typography component = 'span' color= 'deepPurple'>
                    Nationality
                    <Box display='flex' mt={2} >
                        {
                           Object.keys(natObj).map((el,i) => {
                               return <Typography color= 'indigo' ml = {i!==0 && 3}> <b>{NATIONALITY_HUMAN_NAME[el]}</b> : {natObj[el]} contacts </Typography>
                           }) 
                        }
                    </Box>
                </Typography>
            </Box>
        </Paper>
    )
}) 

