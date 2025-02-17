import React, { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import img from "../assets/imglogin.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const createAccount = () => {
    // console.log(email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // save data on firestore
        let obj = {
          name,
          email,
          uid: userCredential.user.uid,
        };
        let Uid = userCredential.user.uid;
        localStorage.setItem("uid", userCredential.user.uid);
        const saveData = await setDoc(doc(db, "users", Uid), obj);
        // console.log(saveData);

        Swal.fire({
          title: "Congratulations!",
          text: "Account created successfully!",
          icon: "success",
        }).then((result) => {
          // Optionally check if result.isConfirmed if needed:
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err,
          icon: "error",
        });
      });
  };
  return (
    <div
      style={{
        // backgroundColor: "#7A58DC",
        backgroundColor: "#7247ed",
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
          height: "63vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            // objectFit: "fit",
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
          height: "63vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
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
            Sign Up
          </Typography>
          <TextField
            fullWidth
            label="Enter Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <br />
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
            onClick={createAccount}
            fullWidth
            variant="contained"
            color="success"
            sx={{ marginBottom: 3 }}
          >
            Create Account
          </Button>
          <Button
            onClick={() => navigate("/login")}
            fullWidth
            variant="contained"
            color="error"
          >
            Already have an account
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default SignUp;
