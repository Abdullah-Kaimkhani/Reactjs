import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Tables({ userData }) {
  const navigate = useNavigate();
  const deleteUser = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm){
    await axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
      location.reload();
    }).catch((err) => {
      console.log(err);
    });
};
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Controls</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((e, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                {e.username}
              </StyledTableCell>
              <StyledTableCell align="right">{e.name}</StyledTableCell>
              <StyledTableCell align="right">{e.email}</StyledTableCell>
              <StyledTableCell align="right">{e.phone}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => {
                    navigate(`/update/${e.id}`);
                  }} sx={{ marginLeft: 5 }} endIcon={<EditIcon />} variant='contained'>Update</Button>
                <Button
                onClick={() => {
                  deleteUser(e.id);
                }}
                sx={{ marginLeft: 5 }} endIcon={<DeleteIcon />} variant='contained'>Del</Button></StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
