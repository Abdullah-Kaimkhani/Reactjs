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
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
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

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user logged in!");
        return;
      }
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const teacherData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(teacher => teacher.createdBy === user.uid);
      setTeachers(teacherData);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const deleteTeacher = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "teachers", id));
        setTeachers(teachers.filter(teacher => teacher.id !== id));
        alert("Teacher deleted successfully!");
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Subject</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Controls</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {teacher.name}
              </StyledTableCell>
              <StyledTableCell align="right">{teacher.subject}</StyledTableCell>
              <StyledTableCell align="right">{teacher.email}</StyledTableCell>
              <StyledTableCell align="right">{teacher.phone}</StyledTableCell>
              <StyledTableCell align="right">{teacher.gender}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => navigate(`/teachers/update/${teacher.id}`)}
                  sx={{ marginLeft: 2 }}
                  endIcon={<EditIcon />}
                  variant="contained"
                >
                  Update
                </Button>
                <Button
                  onClick={() => deleteTeacher(teacher.id)}
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
