import { Button, Card, Container, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import Link from "next/link";
import SnackbarMui from "../../components/alerts/SnackbarMui";
import { db } from "../../firebase/config";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";

const Profile = () => {
  const [deleteWhichItem, setDeleteWhichItem] = useState<string>("");
  const [games, setGames] = useState<Games>([]);
  const [gameId, setGameId] = useState("second");
  const [currentGameTitle, setCurrentGameTitle] = useState<string>("");

  const {
    setOpenAlert,
    delUser,
    delGame,
    setAlerTxt1,
    setDialogTitleContext,
    setOpenSnackBar,
  } = useAuth();

  const auth = getAuth();
  const user: any = auth.currentUser;

  const openDeleteGameAlert = (e: Game) => {
    setDeleteWhichItem("game");
    setCurrentGameTitle(e.title);
    setGameId(e.gameId);
    setOpenAlert(true);
    setDialogTitleContext(`Delete "${e.title}"?`);
    setAlerTxt1(`Are you sure to delete the game "${e.title}"?`);
  };

  const openDeleteUserAlert = () => {
    setDeleteWhichItem("");
    setOpenAlert(true);
    setDialogTitleContext(`Delete Account?`);
    setAlerTxt1(`Want you delete your account?`);
  };

  const handleDeleteGameClick = async () => {
    await delGame(gameId);
    getGamesByUserId();
    setOpenSnackBar(true);
    setAlerTxt1(`The game "${currentGameTitle}" has been deleted`);
    console.log("game successfully deleted");
    console.log("gameId: ", gameId);
  };

  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const getGamesByUserId = async () => {
    const gamesArray: Games = [];
    const q = query(collection(db, "games"), where("userId", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log("doc.id", doc.id);
      const gameObject: Game = { ...doc.data(), gameId: doc.id };
      gamesArray.push(gameObject);
    });
    console.log("gamesArray: ", gamesArray);
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
        // text1={"Are you sure?"}
        // dialogTitle={"Delete User"}
        buttonTxt1={"cancel"}
        buttonTxt2={"delete"}
        buttonVariant1={"outlined"}
        buttonVariant2={"outlined"}
        buttonColor1={"success"}
        buttonColor2={"error"}
        allowFunction={
          deleteWhichItem === "game" ? handleDeleteGameClick : delUser
        }
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
                      className="delete-user-btn"
                      sx={{ backgroundColor: "#e63946" }}
                      variant="contained"
                      onClick={openDeleteUserAlert}
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
                  sx={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr" }}
                >
                  <Link
                    href={"/game/details/[id]"}
                    as={`/game/details/${game.gameId}`}
                  >
                    <Box className="image-con">
                      <Image
                        src={game.image}
                        alt=""
                        width="150px"
                        height="150px"
                      />
                    </Box>
                  </Link>
                  <Link
                    href={"/game/details/[id]"}
                    as={`/game/details/${game.gameId}`}
                  >
                    <Box
                      className="card-body"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingLeft: "0.5em",
                      }}
                    >
                      <Typography variant="h6">{game.title}</Typography>
                      <Typography>{game.genre}</Typography>
                      <Typography>${game.price}</Typography>
                    </Box>
                  </Link>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography sx={{ textAlign: "end" }}>
                        <span
                          style={{
                            backgroundColor: "#303030",
                            borderRadius: "5px 0 0 5px",
                            color: "#fff",
                            padding: "0.3em",
                          }}
                        >
                          {game.platform}
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Link
                        href={`/game/edit/[id]`}
                        as={`/game/edit/${game.gameId}`}
                      >
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            background: "#1A76D2",
                            borderRadius: 1,
                            width: "50px",
                          }}
                        >
                          <EditIcon sx={{ color: "#fff" }} />
                        </Button>
                      </Link>

                      <Button
                        className="delete-game-btn"
                        size="small"
                        variant="contained"
                        sx={{
                          background: "#e63946",
                          borderRadius: 1,
                          marginLeft: "0.3em",
                        }}
                        onClick={() => openDeleteGameAlert(game)}
                      >
                        <DeleteForeverIcon
                          fontSize="large"
                          sx={{ color: "#fff" }}
                        />
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))}
          </Container>
        </>
        <SnackbarMui duration={1500} />
      </div>
    </>
  );
};

export default Profile;
