import { IconButton, TextField, TextareaAutosize } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import React from "react";
import styles from "./InsertGame.module.css";

type Props = {};

function InsertGame({}: Props) {
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
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="genre"
          name="genre"
          label="Genre"
          variant="outlined"
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="outlined"
          name="fsk"
          label="FSK"
          variant="outlined"
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          required
        />
        <TextField
          sx={{ backgroundColor: "#fff" }}
          id="creator"
          name="creator"
          label="Creator"
          variant="outlined"
        />
      </form>
      <div className={styles.iconButton}>
        <IconButton
          size="large"
          style={{ backgroundColor: "#e63946", color: "#fff" }}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default InsertGame;
