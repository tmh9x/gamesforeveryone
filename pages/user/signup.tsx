import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const Signup = () => {
  const { signup, alerTxt1 } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      await signup(data.email, data.password);
      router.push("/user/login");
    } catch (err) {
      console.log("error in handleSignup:", err);
    }
  };

  // console.log('data', data);
  return (
    <Box
      sx={{
        width: "60%",
        margin: "30px auto",
        border: "2px solid lightgray",
        display: "flex",
        flexDirection: "column",
        padding: "2em",
        borderRadius: "5px",
        justifyItems: "center",
        gap: "2em",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Register
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <Box component="form" onSubmit={handleSignup}>
          <Typography>Email address</Typography>
          <TextField
            onChange={(e: any) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
            required
            type="email"
            placeholder="Enter email"
          />

          <Typography>Password</Typography>
          <TextField
            onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
            required
            type="password"
            placeholder="Password"
          />
          <Button variant="contained" sx={{ marginTop: "1em" }} type="submit">
            Register
          </Button>
        </Box>
        <AlertDialogSlide
          dialogTitle="Alert"
          text1={alerTxt1}
          buttonTxt1={"Close"}
        />
      </Box>
    </Box>
  );
};

export default Signup;
