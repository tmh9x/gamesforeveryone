import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { deleteUser, getAuth } from "firebase/auth";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import Container from "@mui/material/Container";
import Image from "next/image";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";

const Profile = () => {
  const auth = getAuth();
  const user: any = auth.currentUser;
  const { setOpenAlert, delUser, delGame } = useAuth();
  const [games, setGames] = useState<{}>({});
  // const [games, setGames] = useState<any>(null);

  const openDeleteAlert = () => {
    setOpenAlert(true);
  };

  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // ----------- Get Gamses data -------------- starts
  const [gamesData, gamesDataLoading, gamesDataError] = useCollection(
    collection(db, "games"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  // ----------- Get Gamses data -------------- ends

  const deleteGame = (id: any) => {
    console.log("id", id);
    delGame(id);
  };

  // console.log("games: ", games);
  console.log(
    "value: ",
    value?.docs.map((doc) => doc.data())
  );
  // console.log("auth.currentUser: ", auth.currentUser);
  // console.log(
  //   "games: ",
  //   gamesData?.docs.map((doc) => doc.data())
  // );

  console.log("user: ", user);
  return (
    <>
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

      <div>
        <>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span> Loading...</span>}

          {value?.docs.map((doc) => {
            return (
              doc.data().authId === auth?.currentUser?.uid && (
                <Container
                  key={doc.id}
                  sx={{
                    backgroundColor: "rgba(180, 180, 180, 0.1)",
                    borderRadius: "5px",
                    padding: "1em",
                    width: "80%",
                    margin: "2em auto",
                  }}
                >
                  <Container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "2em",
                    }}
                  >
                    <Image
                      src="/images/defaultImage.jpg"
                      alt=""
                      width="100"
                      height="100"
                    />
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Firstname: </Typography>
                    <Typography>{doc.data()?.first_name}</Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Lastname: </Typography>
                    <Typography>{doc.data()?.last_name}</Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Gender: </Typography>
                    <Typography>{doc.data()?.gender}</Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Street: </Typography>
                    <Typography>{doc.data()?.street}</Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Post Code: </Typography>
                    <Typography>{doc.data()?.postcode}</Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">City: </Typography>
                    <Typography>{doc.data()?.city}</Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Email: </Typography>
                    <Typography>{doc.data()?.email}</Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Phone: </Typography>
                    <Typography>{doc.data()?.Paragraphhone}</Typography>
                  </Container>
                  <Container
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Birthday: </Typography>
                    <Typography>{doc.data()?.birthday}</Typography>
                  </Container>
                </Container>
              )
            );
          })}
          <Container sx={{ display: "flex", flexDirection: "column" }}>
            <Button variant="contained" href="/user/edit-user">
              Edit Profile
            </Button>
            <br />
            <Button variant="contained" href="/game/edit">
              Edit Game
            </Button>
            <br />
            <Button
              sx={{ backgroundColor: "#e63946" }}
              variant="contained"
              onClick={openDeleteAlert}
            >
              Delete User
            </Button>
          </Container>
        </>
      </div>
    </>
  );
};

export default Profile;
