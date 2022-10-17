import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import Container from "@mui/material/Container";
import Image from "next/image";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SnackbarMui from "../../components/alerts/SnackbarMui";
import { db } from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";

const Profile = () => {
  const auth = getAuth();
  const user: any = auth.currentUser;
  const { setOpenAlert, delUser, delGame } = useAuth();
  const [games, setGames] = useState<Games>([]);

  const openDeleteAlert = () => {
    setOpenAlert(true);
  };

  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const deleteGame = async (gameId: string | undefined) => {
    delGame(gameId);
    console.log("game successfully deleted");
  };

  const getGamesByUserId = async () => {
    const gamesArray: Games = [];
    const q = query(collection(db, "games"), where("userId", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("doc.id", doc.id);
      /* const gameObject: {} = { id: doc.id, data: doc.data() }; */
      const gameObject: Game = { ...doc.data(), gameId: doc.id };
      console.log("doc.data", doc.data());
      gamesArray.push(gameObject);
    });
    console.log("gamesArray", gamesArray);
    setGames(gamesArray);
  };

  useEffect(() => {
    getGamesByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("user: ", user);
  // console.log("GAMES", games);
  // console.log("auth.currentUser: ", auth.currentUser);
  // console.log(
  //   "games: ",
  //   gamesData?.docs.map((doc) => doc.data())
  // );
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

          {games &&
            games.map((game: Game, index: number) => (
              <Container key={index} sx={{ display: "flex" }}>
                <Image src={game.image} alt="" width="40px" height="40px" />
                <Typography>{game.title}</Typography>
                <IconButton
                  sx={{ color: "#e63946" }}
                  onClick={() => deleteGame(game.gameId)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Container>
            ))}

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
        <SnackbarMui text="Profil updated!" duration={1000} />
      </div>
    </>
  );
};

export default Profile;
