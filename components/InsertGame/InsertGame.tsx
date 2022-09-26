import { IconButton, TextField, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

import AddIcon from "@mui/icons-material/Add";
import { db } from "../../firebase/config";
import { storage } from "../../firebase/config";
import styles from "./InsertGame.module.css";
import { useAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const InsertGame = () => {
  const [gameData, setGameData] = useState({});
  const [imageUpload, setImageUpload] = useState<any>(null);

  const { user } = useAuth();
  let myuuid = uuidv4();

  console.log("gameData", gameData);
  const handleChange = (e: any) => {
    console.log("e.target.value", e.target.value);
    setGameData({
      ...gameData,
      userId: user.uid,
      [e.target.name]: e.target.value,
    });
  };

  const insertGame = async () => {
    // IMAGE UPLOAD
    try {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `game-images/${imageUpload.name + myuuid}`);
      uploadBytes(imageRef, imageUpload).then(() => {
        alert("image uploaded");
      });
      // GAME DATA UPLOAD
      const docRef = await addDoc(collection(db, "games"), gameData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  console.log("user", user);

  return (
    <div>
      <form className={styles.insertGame_container}>
        <input
          type="file"
          onChange={(e: any) => {
            setImageUpload(e.target.files[0]);
          }}
        />
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
          onClick={insertGame}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default InsertGame;
