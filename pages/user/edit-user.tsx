import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getAuth, updateProfile } from "firebase/auth";
import InfoIcon from "@mui/icons-material/Info";
import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SnackbarMui from "../../components/alerts/SnackbarMui";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { number, string } from "prop-types";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

// import { formatDataYyMmDd } from "../utils/formatData";

const auth: any = getAuth();
const theme = createTheme();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EditUser: React.FC<any> = () => {
  const [isPwValid, setIsPwValid] = useState<boolean>(true);
  const [isPwEquivalent, setIsPwEquivalent] = useState<boolean>(false);
  const [isPwCharcGreatThan, setIsPwCharcGreatThan] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [FSUsers, setFSUsers] = useState<any>(null);
  const inputFile = useRef<HTMLInputElement | null>;

  // const inputFile = useRef<HTMLInputElement>(null);
  // const inputFile = useRef<HTMLInputElement>();

  const {
    user,
    dialogTitle,
    setDialogTitle,
    openAlert,
    setOpenAlert,
    alertText2,
    setAlertText2,
    alerTxt1,
    setAlerTxt1,
    getDBUsers,
    seteditedUserData,
    editedUserData,
    handleInputValueChange,
    dbUsers,
    setDbUsers,
  } = useAuth();

  const [userData, setUserData] = useState({
    email: "",
    password1: "",
  });

  const router = useRouter();

  //   --------- Submit Changes to Firebase ---- starts
  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    const newUser = {
      ...editedUserData,
      authId: user.uid,
    };
    console.log("newUser: ", newUser);
    const usersRef = doc(db, "users", dbUsers.id);
    setDoc(usersRef, newUser, { merge: true });

    /* ---- Email Check ---- starts*/
    // let re =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if (re.test(editedUserData.email)) {
    //     console.log("valid email :>> ");
    //     setIsEmailValid(true);
    // } else {
    //     console.log("invalid email");
    //     setIsEmailValid(false);
    // }
    /* ---- Password Check ---- starts*/
    // if (editedUserData.password1 !== editedUserData.password2) {
    //   console.log(
    //     "Your first Password is not equivalent with 2nd password. Please enter same password in both fields."
    //   );
    //   setIsPwEquivalent(true);
    //   return false;
    // } else if (editedUserData.password1.length < 5) {
    //   console.log("Password validation is at least 6 character");

    //   setIsPwCharcGreatThan(false);
    //   return false;
    // } else {
    //   setEditedUserData({
    //     ...editedUserData,
    //     password1: editedUserData.password1,
    //   });
    // }
    /* ---- Password Check ---- ends*/
  };
  //   --------- Submit Changes to Firebase ---- ends

  // -------- Remove Selected Image  -------
  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // // -------- Handle Input - only used in edit-user.tsx   starts -------
  // const handleInputValueChange = (e: any) => {
  //   setEditedUserData({
  //     ...editedUserData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // // -------- Handle Input - only used in edit-user.tsx   ends -------

  useEffect(() => {
    getDBUsers();
  }, []);

  //   console.log("user", user);
  //   console.log(userData);
  console.log("editedUserData: ", editedUserData);
  console.log("dbUsers: ", dbUsers);
  console.log("FBuser", user);
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

            <SnackbarMui />

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
                    // defaultValue={mtrsCurrData.first_name}
                    // autoFocus
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
                    // value={
                    //   editedUserData.birthday
                    //     ? formatDataYyMmDd(editedUserData.birthday)
                    //     : ""
                    // }
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
                    error={!isEmailValid}
                    size="small"
                    type="email"
                    disabled
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={editedUserData.email ? editedUserData.email : ""}
                    // onChange={handleInputValueChange}
                    // onFocus={handlePwInputFocus}
                    // onBlur={onBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!isPwValid}
                    size="small"
                    disabled
                    fullWidth
                    name="password1"
                    label="Password"
                    type="password"
                    id="password1"
                    autoComplete="new-password"
                    // value={
                    //   editedUserData.password1 ? editedUserData.password1 : ""
                    // }
                    // onChange={handleInputValueChange}
                    // value={password1}
                    // onChange={(e) => setPassword1(e.target.value)}
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

/* 
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : editedUserData.avatar_picture
                        ? editedUserData.avatar_picture
                        : ""
                    }
                    alt="avatar"
                  />

                  {!editedUserData.avatar_picture && !selectedImage && (
                    <span>Please choose a profile image (optional)</span>
                  )}
                </div>
                <div className="image-events-con">
                  
                  <input
                    accept="image/*"
                    type="file"
                    id="file"
                    onChange={handleSelectFileChange}
                    // ref={el => {inputFile.current = el;}}
                    ref={inputFile}
                    style={{ display: "none" }}
                  />{" "}
                  {selectedImage && (
                    <Button
                      size="small"
                      onClick={removeSelectedImage}
                      className="remove-image-btn"
                    >
                      Remove This Image
                    </Button>
                  )}
                </div>
              </div> */
