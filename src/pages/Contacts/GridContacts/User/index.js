import {  Grid, Link, Paper,Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { format, parseISO } from "date-fns";
import { NATIONALITY_HUMAN_NAME, NATIONAL_COLOR } from "../../../../constants/nationality";


const useStyles =  makeStyles({
    root : {
        padding : '5px',
        position : 'relative'
    },
    box : {
        display : 'flex',
        padding : '10px'
    },
    userInfo : {
        marginLeft : '15px'
    }
})

const converToRgb = (color) => {
    var aRgbHex = color.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}

export const User = ({user}) => {
    const classes = useStyles();
    const countryColor = NATIONAL_COLOR[user.nat];
    const rgbArr = converToRgb(countryColor.slice(1));

    const natStyle = {
        border : `1px solid ${countryColor}`,
        padding : 3,
        position : 'absolute',
        color : countryColor,
        right : 10,
        top : 12,
        fontWeight : '500',
        background : `rgb(${rgbArr[0]},${rgbArr[1]},${rgbArr[2]},.2)`
    }
    return (
        <Grid className = {classes.root} xs = {4}>
            <Paper className = {classes.box} elevation = {4}>
                <img src = {user.picture.large} alt='img'/>
                <Box className = {classes.userInfo}>
                    <Typography component = 'div'>
                        <b>Full Name : </b>
                        <small>
                        {user.name.title} {user.name.first } {user.name.last}
                        </small>
                    </Typography>
                    <Typography component = 'div'>
                        <b>Birth Day : </b>
                        {user.dob.age} years 
                        <small> {format(parseISO(user.dob.date),"MM/dd/yyyy")} 
                        </small>
                    </Typography>
                    <Typography component = 'div'>
                        <b>Email : </b>
                        <small>
                            <Link underline ='none' href = {user.email}>{user.email}</Link>
                        </small>
                    </Typography>
                    <Typography component = 'div'>
                        <b>Phone : </b>
                        <small>
                            <Link underline ='none' href = {user.phone}>{user.phone}</Link>
                        </small>
                    </Typography>
                    <Typography component = 'div'>
                        <b>Location: </b>
                        <small>
                            /{user.location.country}/ {user.location.street.number} {user.location.street.name}
                        </small>
                    </Typography>
                </Box>
                <div style = {{...natStyle }} width ={0.1}>
                    {NATIONALITY_HUMAN_NAME[user.nat]}
                </div>
            </Paper>
        </Grid>
    )
}
