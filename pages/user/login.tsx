import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { user, login, alerTxt1 } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    console.log(user);
    try {
      await login(data.email, data.password);
      router.push("/user/profile");
    } catch (err) {
      console.log(err);
    }
  };
  console.log("data: ", data);
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
        Login
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <Box component="form" onSubmit={handleLogin}>
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
            Login
          </Button>
        </Box>
      </Box>

      <AlertDialogSlide
        dialogTitle="Allert"
        text1={alerTxt1}
        buttonTxt1={"Close"}
      />
    </Box>
  );
};

export default Login;
