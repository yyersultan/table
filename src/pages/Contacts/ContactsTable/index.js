import format from 'date-fns/format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { parseISO } from 'date-fns';
import { CopyToClicpBoard } from '../../../components/CopyToClicpBoard';
import { NATIONALITY_HUMAN_NAME } from '../../../constants/nationality';

const useStyles = makeStyles({
    table : {

    }
})

export const ContactsTable = ({data}) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-label="contacts table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell >Full Name</TableCell>
              <TableCell >BirhDay</TableCell>
              <TableCell >Email</TableCell>
              <TableCell >Phone</TableCell>
              <TableCell >LOcation</TableCell>
              <TableCell >Nationality</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((contact) => (
              <TableRow
                key={contact.login.uuid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >
                    <Avatar src= {contact.picture.thumbnail} alt=""/>
                </TableCell>
                <TableCell >{contact.name.title} {contact.name.title} {contact.name.last} </TableCell>
                <TableCell >
                    <Typography>{format(parseISO(contact.dob.date),"MM/dd/yyyy")}</Typography>
                    <Typography>{contact.dob.age} years</Typography>
                </TableCell>
                <TableCell > <CopyToClicpBoard text = {contact.email}/> </TableCell>
                <TableCell > <CopyToClicpBoard text = {contact.phone}/> </TableCell>
                <TableCell >
                  <Typography>{contact.location.country}</Typography>
                  <Typography>
                    {contact.location.city} 
                    {contact.location.street.name}
                    {contact.location.street.number}
                  </Typography>
                </TableCell>
                <TableCell >{ NATIONALITY_HUMAN_NAME[contact.nat] }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
    )
}