import React, { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import Swal from "sweetalert2";
import { doc, getDoc } from "firebase/firestore";
import img from "../assets/imglogin.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        localStorage.setItem("uid", userCredential.user.uid);

        // get data from firestore

        const getData = await getDoc(doc(db, "users", userCredential.user.uid));
        console.log(getData.data());

        localStorage.setItem("userData", JSON.stringify(getData.data()));

        Swal.fire({
          title: "Congratulations!",
          text: "Logged in successfully!",
          icon: "success",
        }).then((result) => {
          // Optionally check if result.isConfirmed if needed:
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Invalid email or password",
          icon: "error",
        });
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#7A58DC",
        display: "flex",
        width: "100%",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "55vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fit",
            borderRadius: "8px 0 0 8px",
          }}
          src={img}
          alt="LMS img"
        />
      </div>
      <div
        style={{
          width: "60vw",
          backgroundColor: "#7A58DC",
          maxWidth: "450px",
          height: "55vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 5,
            borderRadius: "0 8px 8px 0",
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Login
          </Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="Enter Email"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => setPasswod(e.target.value)}
            fullWidth
            label="Enter Password"
          />
          <br />
          <br />
          <Button
            onClick={loginUser}
            fullWidth
            variant="contained"
            color="success"
            sx={{ marginBottom: 3 }}
          >
            login
          </Button>
          <Button
            onClick={() => navigate("/signUp")}
            fullWidth
            variant="contained"
            color="error"
          >
            Create new account
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
