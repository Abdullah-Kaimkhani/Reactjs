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

export default function StudentList() {
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getDataFromDatabase();
    }, []);

    const getDataFromDatabase = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.log("No user logged in!");
                return;
            }

            const querySnapshot = await getDocs(collection(db, "students"));
            const userData = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(student => student.createdBy === user.uid); // Filter by current user's UID
            setUsers(userData);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, "students", id));
                // setRefresh(!refresh);
                setUsers(users.filter(user => user.id !== id)); // Remove from UI immediately
                alert("User deleted successfully!");
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Father Name</StyledTableCell>
                        <StyledTableCell align="right">Class</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Phone</StyledTableCell>
                        <StyledTableCell align="right">Gender</StyledTableCell>
                        <StyledTableCell align="right">Controls</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((e, i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row">{e.name}</StyledTableCell>
                            <StyledTableCell align="right">{e.fatherName}</StyledTableCell>
                            <StyledTableCell align="right">{e.studentClass}</StyledTableCell>
                            <StyledTableCell align="right">{e.email}</StyledTableCell>
                            <StyledTableCell align="right">{e.phone}</StyledTableCell>
                            <StyledTableCell align="right">{e.gender}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button
                                    onClick={() => navigate(`/students/update/${e.id}`)}
                                    sx={{ marginLeft: 2 }}
                                    endIcon={<EditIcon />}
                                    variant="contained"
                                >
                                    Update
                                </Button>
                                <Button
                                    onClick={() => deleteUser(e.id)}
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
