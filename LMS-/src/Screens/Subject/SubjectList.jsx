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

export default function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user logged in!");
        return;
      }
      const querySnapshot = await getDocs(collection(db, "subjects"));
      const subjectData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(subject => subject.createdBy === user.uid);
      setSubjects(subjectData);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const deleteSubject = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this subject?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "subjects", id));
        setSubjects(subjects.filter(subject => subject.id !== id));
        alert("Subject deleted successfully!");
      } catch (error) {
        console.error("Error deleting subject:", error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="subject table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Subject</StyledTableCell>
            <StyledTableCell align="right">Class</StyledTableCell>
            <StyledTableCell align="right">Group</StyledTableCell>
            <StyledTableCell align="right">Controls</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {subject.username}
              </StyledTableCell>
              <StyledTableCell align="right">{subject.email}</StyledTableCell>
              <StyledTableCell align="right">{subject.phone}</StyledTableCell>
              <StyledTableCell align="right">{subject.gender}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  onClick={() => navigate(`/subjects/update/${subject.id}`)}
                  sx={{ marginLeft: 2 }}
                  endIcon={<EditIcon />}
                  variant="contained"
                >
                  Update
                </Button>
                <Button
                  onClick={() => deleteSubject(subject.id)}
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
