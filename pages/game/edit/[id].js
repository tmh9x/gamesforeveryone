import { IconButton, TextField, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { ref, uploadBytes } from "firebase/storage";

import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/system";
import { useAuth } from "../../../context/AuthContext";

const EditGame = (gm) => {
  const game = JSON.parse(gm.game);

  const [gameData, setGameData] = useState(game);
  const [imageUpload, setImageUpload] = useState(null);

  const { user } = useAuth();

  const handleChange = (e) => {
    console.log("e.target.value", e.target.value);
    setGameData({
      ...gameData,
      [e.target.name]: e.target.value,
    });
    //  setGameData({
    //    ...gameData,
    //    userId: user.uid,
    //    [e.target.name]: e.target.value,
    //  });
  };

  const updateGame = async () => {
    // IMAGE UPLOAD
    console.log("game.gameId: ", game.gameId);
    try {
      if (imageUpload === null) {
        setGameData({
          ...gameData,
          image:
            "https://cdn.pixabay.com/photo/2021/02/16/18/55/gamer-6022003_1280.png",
        });
      } else {
        const imageRef = ref(storage, `game-images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then(() => {
          alert("image uploaded");
        });
      }

      // GAME DATA UPLOAD
      const gameRef = doc(db, "games", game.gameId);
      setDoc(gameRef, gameData, { merge: true });

      // const docRef = await addDoc(collection(db, "games"), gameData);
      console.log("Document written with ID: ", gameRef.id);
    } catch (e) {
      console.error("Error adding games: ", e);
    }
  };

  //  console.log("user", user);
  console.log("gameData", gameData);
  console.log("game: ", game);
  return (
    <Container
      sx={{
        backgroundColor: "rgba(180, 180, 180, 0.1)",
        width: "345px",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        margin: "1.5em auto",
        gap: "1em",
        borderRadius: "5px",
      }}
    >
      <form>
        <h1>Edit Game</h1>
        <input
          type="file"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="platform"
          name="platform"
          label="Platform"
          variant="outlined"
          onChange={handleChange}
          value={gameData?.platform ? gameData?.platform : ""}
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          onChange={handleChange}
          value={gameData?.title ? gameData?.title : ""}
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="genre"
          name="genre"
          label="Genre"
          variant="outlined"
          onChange={handleChange}
          value={gameData?.genre ? gameData?.genre : ""}
        />
        <TextField
          type="number"
          sx={{ backgroundColor: "#fff" }}
          id="year"
          name="year"
          label={"Year"}
          variant="outlined"
          onChange={handleChange}
          value={gameData?.year ? gameData?.year : ""}
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
          value={gameData?.description ? gameData?.description : ""}
          required
        />
        <TextField
          type="number"
          sx={{ backgroundColor: "#fff" }}
          id="outlined"
          name="fsk"
          label="FSK"
          variant="outlined"
          onChange={handleChange}
          value={gameData?.fsk ? gameData?.fsk : ""}
          required
        />
        <TextField
          type="number"
          sx={{ backgroundColor: "#fff" }}
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          onChange={handleChange}
          value={gameData?.price ? gameData?.price : ""}
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="creator"
          name="creator"
          label="Creator"
          variant="outlined"
          onChange={handleChange}
          value={gameData?.creator ? gameData?.creator : ""}
        />
      </form>
      <Container>
        <IconButton
          sx={{ textAlign: "center" }}
          type="submit"
          size="large"
          style={{ backgroundColor: "#e63946", color: "#fff" }}
          onClick={updateGame}
        >
          <AddIcon />
        </IconButton>
      </Container>
    </Container>
  );
};

export async function getServerSideProps({ params }) {
  // export async function getServerSideProps( {params}: {} ) {
  console.log("params: ", params);
  const docRef = doc(db, "games", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const newGame = {
      ...docSnap.data(),
      gameId: docSnap.id,
    };
    const game = JSON.stringify(newGame);
    console.log("Document data:", docSnap.data());
    return { props: { game } };
  } else {
    console.log("No such document!");
    return { props: {} };
  }
}

export default EditGame;
