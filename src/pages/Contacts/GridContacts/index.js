import { Grid, Paper } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { User } from "./User";


const useStyles = makeStyles({
    root : {
        padding : '20px'
    },
    users: {
        display : 'flex',
        justifyContent : 'space-between',
        flexGrow : 'grow'
    }
})

export const GridContacts = ({data}) => {
    const classes = useStyles();
    return (
        <Paper className = {classes.root}>
            <Grid spacing = {2} container >
            {
                data.map((user,i) => {
                    return <User key = {user.name + i}  user = {user}/>
                })
            }
            </Grid>
        </Paper>
    )
}