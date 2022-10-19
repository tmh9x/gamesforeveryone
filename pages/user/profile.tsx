import { Button, Card, Container, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
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
  const { setOpenAlert, delUser, delGame, editGame } = useAuth();
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
                <Box
                  key={doc.id}
                  sx={{
                    backgroundColor: "rgba(180, 180, 180, 0.1)",
                    borderRadius: "5px",
                    padding: "1em",
                    margin: "2em 1em",
                  }}
                >
                  <Box
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
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Firstname: </Typography>
                    <Typography>{doc.data()?.first_name}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Lastname: </Typography>
                    <Typography>{doc.data()?.last_name}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Gender: </Typography>
                    <Typography>{doc.data()?.gender}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Street: </Typography>
                    <Typography>{doc.data()?.street}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Post Code: </Typography>
                    <Typography>{doc.data()?.postcode}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">City: </Typography>
                    <Typography>{doc.data()?.city}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Email: </Typography>
                    <Typography>{doc.data()?.email}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Phone: </Typography>
                    <Typography>{doc.data()?.Paragraphhone}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Birthday: </Typography>
                    <Typography>{doc.data()?.birthday}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button variant="contained" href="/user/edit-user">
                      Edit User
                    </Button>

                    <Button
                      sx={{ backgroundColor: "#e63946" }}
                      variant="contained"
                      onClick={openDeleteAlert}
                    >
                      Delete User
                    </Button>
                  </Box>
                </Box>
              )
            );
          })}

          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            {games &&
              games.map((game: Game, index: number) => (
                <Card
                  key={index}
                  sx={{ display: "grid", gridTemplateColumns: "30% 50% 20%" }}
                >
                  <Box>
                    <Image
                      src={game.image}
                      alt=""
                      width="150px"
                      height="150px"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingLeft: "0.5em",
                    }}
                  >
                    <Typography>{game.platform}</Typography>
                    <Typography>{game.title}</Typography>
                    <Typography>${game.price}</Typography>
                    <Typography>{game.genre}</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton
                      sx={{ background: "#1A76D2", borderRadius: 1 }}
                      href={`/game/edit/${game.gameId}`}
                    >
                      <EditIcon fontSize="large" sx={{ color: "#fff" }} />
                    </IconButton>

                    <IconButton
                      sx={{ background: "#e63946", borderRadius: 1 }}
                      onClick={() => deleteGame(game.gameId)}
                    >
                      <DeleteForeverIcon
                        fontSize="large"
                        sx={{ color: "#fff" }}
                      />
                    </IconButton>
                  </Box>
                </Card>
              ))}
          </Container>
        </>
        <SnackbarMui text="Profil updated!" duration={1000} />
      </div>
    </>
  );
};

export default Profile;
