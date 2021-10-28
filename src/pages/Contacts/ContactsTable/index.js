import format from 'date-fns/format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { parseISO } from 'date-fns';
import { CopyToClicpBoard } from '../../../components/CopyToClicpBoard';
import { NATIONALITY_HUMAN_NAME,NATIONAL_COLOR } from '../../../constants/nationality';
import { Box } from '@mui/system';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Typography } from '@mui/material';
import { useState } from 'react';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  padding : '5px'
  
};

export const ContactsTable = ({data}) => {
  const[sortState,setSortState] = useState(0);

  const onSort = () => {
    
    switch(sortState){
      case 0:
        data.sort((a,b) => a.name.first.localeCompare(b.name.first));
        setSortState(prev => prev + 1);
        break;
      case 1:
        data.sort((a,b) => b.name.first.localeCompare(a.name.first));
        setSortState(prev => prev + 1);
        break;
      case 2:
        setSortState(0);
        break;
      default :return null;
    }
    console.log(data);
  }

  
  
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }} aria-label="contacts table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell onClick = {onSort}>
                Full Name 
                
              </TableCell>
              <TableCell >BirhDay</TableCell>
              <TableCell >Email</TableCell>
              <TableCell >Phone</TableCell>
              <TableCell >LOcation</TableCell>
              <TableCell >Nationality</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((contact) => {
              const natColor = NATIONAL_COLOR[contact.nat];
              
              return(
                <TableRow
                  key={contact.login.uuid}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >
                      <Avatar src= {contact.picture.thumbnail} alt=""/>
                  </TableCell>
                  <TableCell >{contact.name.title} {contact.name.first} {contact.name.last} </TableCell>
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
                  <TableCell >
                    <Box sx={{ ...commonStyles, borderColor : natColor,color : natColor,background : `1C${natColor}`, }}>
                    { NATIONALITY_HUMAN_NAME[contact.nat] }
                    </Box>
                  </TableCell>
                </TableRow>)
            })}
          </TableBody>
        </Table>
      </TableContainer> 
    )
}