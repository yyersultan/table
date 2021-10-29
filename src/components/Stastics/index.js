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
        
    },
    natStatList : {
        marginTop : '20px',
        display : 'flex',
        flexWrap : 'wrap',
        
    }
    

})

export const Stastics = memo(({data}) => {
    console.log("render statistics")
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
                    <Typography>{data.length}</Typography>
                </Typography>

                <Typography ml ={3} mr = {3} color = {'darkgray'}>
                    Males 
                    <Typography>{getGender('male')}</Typography>
                </Typography>

                <Typography color = {'darkgray'}>
                    Females
                    <Typography>{getGender('female')}</Typography> 
                </Typography>

            </Box>
            <Box className = {classes.natStastics}>
                <Typography component = 'span' color= 'deepPurple'>
                    Nationality
                    <div className = {classes.natStatList}  mt={2} >
                        {
                           Object.keys(natObj).map((el,i) => {
                               return <Typography 
                                        key = {el + i} 
                                        mb = {2}
                                        color= 'indigo' ml = {i%10!==0 && 3}>
                                        <b>{NATIONALITY_HUMAN_NAME[el]}</b> :
                                        {natObj[el]} contacts </Typography>
                           }) 
                        }
                    </div>
                </Typography>
            </Box>
        </Paper>
    )
}) 

