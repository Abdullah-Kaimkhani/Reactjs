import React, { useEffect, useState } from "react";
import { Button, Paper, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signUpUser } from "../store/./slices/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      navigate('/dashboard');
    }
  }, [navigate]);


  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignUp = async () => {
    if (!name.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your name!",
        icon: "error"
      });
      return;
    }
    if (!email.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your email!",
        icon: "error"
      });
      return;
    }
    if (!password.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please enter your password!",
        icon: "error"
      });
      return;
    }
    if (!role) {
      Swal.fire({
        title: "Error!",
        text: "Please select a role!",
        icon: "error"
      });
      return;
    }

    try {
      await dispatch(signUpUser({ name, email, password, role })).unwrap();
      Swal.fire({
        title: "Congratulations!",
        text: "Account created successfully!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
      });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        margin: 'auto',
        borderRadius: '0 8px 8px 0',
        width: '40vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
        Sign Up
      </Typography>
      <TextField
        fullWidth
        label="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        label="Enter Email"
      />
      <br /><br />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        label="Enter Password"
        type="password"
      />
      <br /><br />
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <Button
        onClick={handleSignUp}
        fullWidth
        variant="contained"
        color="success"
        sx={{ marginBottom: 3 }}
      >
        Create Account
      </Button>
      <Button
        onClick={() => navigate("/")}
        fullWidth
        variant="contained"
        color="error"
      >
        Already have an account
      </Button>
    </Paper>
  );
};

export default SignUp;
