import { IconButton, TextField, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import AddIcon from "@mui/icons-material/Add";
import { db } from "../../firebase/config";
import styles from "./InsertGame.module.css";
import { useAuth } from "../../context/AuthContext";

function InsertGame() {
  const { insertGame } = useAuth();

  const [gameData, setGameData] = useState({});
  console.log("gameData", gameData);
  const handleChange = (e: any) => {
    console.log("e.target.value", e.target.value);
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    console.log('handleSubmit');
    // e.preventDefault();
    insertGame("games", gameData);
  };
  //   const [gameData, setGameData] = useState({});
  //   console.log("gameData", gameData);
  //   const handleChange = (e: any) => {
  //     console.log("e.target.value", e.target.value);
  //     setGameData({ ...gameData, [e.target.name]: e.target.value });
  //   };

  //   const insertGame = async (e: any) => {
  //     try {
  //       const docRef = await addDoc(collection(db, "games"), gameData);
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   };

  return (
    <div>
      <form className={styles.insertGame_container}>
        <input type="file" />
        <TextField
          className={styles.insertGame_container_textField}
          sx={{ backgroundColor: "#fff" }}
          id="platform"
          name="platform"
          label="Platform"
          variant="outlined"
          onChange={handleChange}
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          onChange={handleChange}
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="genre"
          name="genre"
          label="Genre"
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          type="number"
          sx={{ backgroundColor: "#fff" }}
          id="year"
          name="year"
          label="Year"
          variant="outlined"
          onChange={handleChange}
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
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
          required
        />
        <TextField

          sx={{ backgroundColor: "#fff" }}
          id="creator"
          name="creator"
          label="Creator"
          variant="outlined"
          onChange={handleChange}
        />
      </form>
      <div className={styles.iconButton}>
        <IconButton
          type="submit"
          size="large"
          style={{ backgroundColor: "#e63946", color: "#fff" }}
          onClick={handleSubmit}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default InsertGame;
