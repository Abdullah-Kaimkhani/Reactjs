import React, { useEffect, useState } from 'react';
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
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user logged in!");
        return;
      }
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(cls => cls.createdBy === user.uid);
      setClasses(classData);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const deleteClass = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this class?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "classes", id));
        setClasses(classes.filter(cls => cls.id !== id));
        alert("Class deleted successfully!");
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="class table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Class Name</StyledTableCell>
            <StyledTableCell align="right">Section</StyledTableCell>
            <StyledTableCell align="right">Teacher</StyledTableCell>
            <StyledTableCell align="right">Room Number</StyledTableCell>
            <StyledTableCell align="right">Schedule</StyledTableCell>
            <StyledTableCell align="right">Controls</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classes.map((cls, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {cls.className}
              </StyledTableCell>
              <StyledTableCell align="right">{cls.section}</StyledTableCell>
              <StyledTableCell align="right">{cls.teacher}</StyledTableCell>
              <StyledTableCell align="right">{cls.roomNumber}</StyledTableCell>
              <StyledTableCell align="right">{cls.schedule}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => navigate(`/class/update/${cls.id}`)}
                  sx={{ marginLeft: 2 }}
                  endIcon={<EditIcon />}
                  variant="contained"
                >
                  Update
                </Button>
                <Button
                  onClick={() => deleteClass(cls.id)}
                  sx={{ marginLeft: 2 }}
                  endIcon={<DeleteIcon />}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
