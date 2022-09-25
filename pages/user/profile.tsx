import React, { useEffect } from "react";
import { deleteUser, getAuth } from "firebase/auth";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const auth = getAuth();
  const user: any = auth.currentUser;
  const { setOpenAlert, delUser } = useAuth();

  const openDeleteAlert = () => {
    setOpenAlert(true);
  };

  console.log("auth.currentUser: ", auth.currentUser);
  console.log("user: ", user);
  return (
    <>
      <Button onClick={openDeleteAlert}>Delete User</Button>
      <br />
      <Button href="/user/edit-user">Edit Profile</Button>

      <AlertDialogSlide
        text1={"Are you sure?"}
        dialogTitle={"Delete User"}
        buttonTxt1={"cancel"}
        buttonTxt2={"delete"}
        buttonVariant1={"outlined"}
        buttonVariant2={"outlined"}
        buttonColor1={"success"}
        buttonColor2={"error"}
        allowFunction={delUser}
        // rejectFunction={}
      />
    </>
  );
};

export default Dashboard;
