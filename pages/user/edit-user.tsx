import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { db, storage } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SnackbarMui from "../../components/alerts/SnackbarMui";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const theme = createTheme();

const EditUser: React.FC = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  let myuuid = uuidv4();
  const imagePlaceholder= 'https://thumbs.dreamstime.com/t/default-placeholder-profile-icon-avatar-gray-man-90197993.jpg'
  const {
    user,
    getDBUsers,
    editedUserData,
    handleInputValueChange,
    dbUsers,
    setOpenSnackBar,
    setAlerTxt1,
  } = useAuth();

  const router = useRouter();

  //   --------- Submit profile update to Firebase ---- starts
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // IMAGE UPLOAD
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      if (imageUpload) {
        const storageRef = ref(
          storage,
          "game-images/" + imageUpload.name + myuuid
        );

        const uploadTask = uploadBytesResumable(
          storageRef,
          imageUpload,
          metadata
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                console.log(
                  "User doesn't have permission to access the object"
                );
                break;
              case "storage/canceled":
                console.log("User canceled the upload");
                break;
              // ...
              case "storage/unknown":
                console.log(
                  "Unknown error occurred, inspect error.serverResponse"
                );
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);

              // User DATA UPLOAD starts -------///
              const newUser = {
                ...editedUserData,
                image: downloadURL,
                authId: user.uid,
              };
              console.log("newUser: ", newUser);

              // User DATA UPLOAD
              const usersRef = doc(db, "users", dbUsers.id);
              setDoc(usersRef, newUser, { merge: true });

              router.push("/user/profile");
              setAlerTxt1("Profil updated!");
              setOpenSnackBar(true);
              console.log("Document written with ID: ", usersRef.id);
            });
          }
          // User DATA UPLOAD ends -------///
        );
      } else {
        // User DATA UPLOAD
        const usersRef = doc(db, "users", dbUsers.id);
        setDoc(
          usersRef,
          { ...editedUserData, image: imagePlaceholder },
          { merge: true }
        );

        router.push("/user/profile");
        setAlerTxt1("Profil updated!");
        setOpenSnackBar(true);
        console.log("Document written with ID: ", usersRef.id);
      }

      // const usersRef = doc(db, "users", dbUsers.id);
      // setDoc(usersRef, newUser, { merge: true });
      // router.push("/user/profile");
      // setAlerTxt1("Profil updated!");
      // setOpenSnackBar(true);
    } catch (error) {
      console.log("error-edit-user: ", error);
    }
  };
  //   --------- Submit profile update to Firebase ---- ends

  useEffect(() => {
    getDBUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   console.log("user", user);
  //   console.log(userData);
  console.log("editedUserData: ", editedUserData);
  // console.log("dbUsers: ", dbUsers);
  // console.log("FBuser", user);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {editedUserData === null || editedUserData === undefined ? (
          <SnackbarMui text="No data available" />
        ) : (
          <Box
            className="sign-up-mentor-con"
            sx={{
              width: "80%",
              margin: "8px auto 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit
            </Typography>
            <Typography component="h1" variant="h5">
              User
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleEditSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="file"
                    fullWidth
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    name="username"
                    required
                    fullWidth
                    autoComplete="off"
                    id="username"
                    label="User Name"
                    value={
                      editedUserData.username ? editedUserData.username : ""
                    }
                    onChange={handleInputValueChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    name="first_name"
                    required
                    fullWidth
                    autoComplete="off"
                    id="first_name"
                    label="First Name"
                    value={
                      editedUserData.first_name ? editedUserData.first_name : ""
                    }
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    required
                    fullWidth
                    autoComplete="off"
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    value={
                      editedUserData.last_name ? editedUserData.last_name : ""
                    }
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    type="date"
                    required
                    fullWidth
                    autoComplete="off"
                    id="birthday"
                    label="Birthday"
                    name="birthday"
                    value={
                      editedUserData.birthday ? editedUserData.birthday : ""
                    }
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      id="gender"
                      name="gender"
                      // value={gender}
                      label="Gender"
                      value={editedUserData.gender ? editedUserData.gender : ""}
                      onChange={handleInputValueChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    name="street"
                    fullWidth
                    autoComplete="street"
                    id="street"
                    label="Street and house number"
                    value={editedUserData.street ? editedUserData.street : ""}
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="number"
                    name="postcode"
                    fullWidth
                    autoComplete="postcode"
                    id="postcode"
                    label="Postcode"
                    value={
                      editedUserData.postcode ? editedUserData.postcode : ""
                    }
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    name="city"
                    fullWidth
                    autoComplete="city"
                    id="city"
                    label="City"
                    value={editedUserData.city ? editedUserData.city : ""}
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="text"
                    name="phone"
                    fullWidth
                    autoComplete="true"
                    id="phone"
                    label="Phone"
                    value={editedUserData.phone ? editedUserData.phone : ""}
                    onChange={handleInputValueChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // color="error"
                    size="small"
                    type="email"
                    disabled
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={editedUserData.email ? editedUserData.email : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    disabled
                    fullWidth
                    name="password1"
                    label="Password"
                    type="password"
                    id="password1"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <div
                className="btn-con"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <Button
                  href="/mentors/profile"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  sx={{ mt: 3, mb: 2, width: "30px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="error"
                >
                  Save
                </Button>
              </div>
            </Box>
          </Box>
        )}
      </ThemeProvider>
    </>
  );
};

export default EditUser;
