import { Pagination } from "@mui/material"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root : {
        marginTop : '30px'
    }
})
export const PaginationList = ({len,page,setPage}) => {
    const count = Math.ceil(len/12)
    const classes = useStyles();
    const handleChange = (e,value) => {
        
        setPage(value-1);
    }

    return <Pagination 
            className = {classes.root}
            count = {count}
            page = {page+1}
            onChange = {handleChange}
            color = 'secondary' />
}