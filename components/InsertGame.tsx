import {
  Box,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import AddIcon from "@mui/icons-material/Add";
import { db } from "../firebase/config";
import { storage } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

// Genre starts
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const genres = [
  "Ego-Shooter",
  "Open-World-Spiel",
  "Action-Adventure",
  "Action",
  "Nichtlineares Gameplay",
  "Adventure",
  "Fighting",
  "Survival",
  "Rhythm",
  "Battle Royale",
  "Role-Playing",
  "Strategy",
].sort();

function getStyles(name: string, values: readonly string[], theme: Theme) {
  return {
    fontWeight:
      values.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
// Genre starts ends

const platforms = [
  "PS-3",
  "PS-4",
  "PS-5",
  "Xbox S",
  "Xbox X",
  "Google Stadia",
  "Nintedo Super NES Classic",
].sort();

const InsertGame: React.FC = () => {
  const [gameData, setGameData] = useState<Game | any>({});
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [inputValues, SetInputValues] = useState<string[]>([]);

  const { user, dbUsers } = useAuth();
  let myuuid = uuidv4();

  const theme = useTheme();

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    console.log("value: ", value);

    setGameData({
      ...gameData,
      userId: user.uid,
      sellerEmail: user.email,
      sellerPhone: dbUsers.phone,
      [event.target.name]: typeof value !== "string" ? value : value.trim(),
    });
  };

  const handleInsertGameClick = async () => {
    // IMAGE UPLOAD
    try {
      // if (imageUpload == null) return;
      if (!imageUpload) {
        setGameData({
          ...gameData,
          image:
            "https://cdn.pixabay.com/photo/2021/02/16/18/55/gamer-6022003_1280.png",
        });
      } else {
        const metadata = {
          contentType: "image/jpeg",
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(
          storage,
          "game-images/" + imageUpload.name + myuuid
        );
        const uploadTask = uploadBytesResumable(
          storageRef,
          imageUpload,
          metadata
        );

        // Listen for state changes, errors, and completion of the upload.
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

              // GAME DATA UPLOAD starts -------///
              const newGame = {
                ...gameData,
                image: downloadURL,
              };
              console.log("newGame: ", newGame);

              addDoc(collection(db, "games"), newGame).then((result) => {
                console.log("Document written with ID: ", result.id);
              });
            });
          }
          // GAME DATA UPLOAD ends -------///
        );
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // console.log("user", user);
  console.log("gameData", gameData);
  console.log("dbUsers: ", dbUsers);

  return (
    <Container
      sx={{
        backgroundColor: "rgba(180, 180, 180, 0.1)",
        width: "345px",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        margin: "1.5em auto",
        /*    gap: "1em", */
        borderRadius: "5px",
      }}
    >
      <form>
        <input
          type="file"
          onChange={(e: any) => {
            setImageUpload(e.target.files[0]);
          }}
        />
        <FormControl
          required
          sx={{ backgroundColor: "#fff", width: "100%", margin: "1em auto" }}
        >
          <InputLabel id="platform">Platform</InputLabel>
          <Select
            labelId="multiple-platform-label"
            id="multiple-platform"
            required
            name="platform"
            label="platforms"
            value={gameData.platform ? gameData.platform : ""}
            onChange={(event: SelectChangeEvent<typeof gameData.platform>) =>
              handleChange(event)
            }
            // onChange={handleChange}
          >
            {platforms.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ backgroundColor: "#fff", marginBottom: "1em" }}
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          required
          fullWidth
        />
        <FormControl
          required
          sx={{
            backgroundColor: "#fff",
            width: "100%",
            margin: "auto",
            marginBottom: "1em",
          }}
        >
          <InputLabel id="genre">Genre</InputLabel>
          <Select
            labelId="multiple-genre-label"
            id="multiple-genre"
            multiple
            required
            name="genre"
            value={gameData.genre ? gameData.genre : inputValues}
            onChange={(event: SelectChangeEvent<typeof gameData.genre>) =>
              handleChange(event)
            }
            // onChange={handleChange}
            input={<OutlinedInput id="select-multiple-genre" label="Genre" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {genres.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, inputValues, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="number"
          sx={{ backgroundColor: "#fff", marginBottom: "1em" }}
          id="year"
          name="year"
          label="Year"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          required
          fullWidth
        />
        <TextField
          sx={{ backgroundColor: "#fff", marginBottom: "1em" }}
          multiline
          maxRows={10}
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          required
          fullWidth
        />
        <TextField
          type="number"
          sx={{ backgroundColor: "#fff", marginBottom: "1em" }}
          id="outlined"
          name="fsk"
          label="FSK"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          required
          fullWidth
        />
        <TextField
          type="number"
          sx={{ backgroundColor: "#fff", marginBottom: "1em" }}
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          required
          fullWidth
        />
        <TextField
          sx={{ backgroundColor: "#fff", marginBottom: "1em" }}
          id="creator"
          name="creator"
          label="Creator"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          fullWidth
        />
      </form>

      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          type="submit"
          size="large"
          style={{ backgroundColor: "#e63946", color: "#fff" }}
          onClick={handleInsertGameClick}
        >
          <AddIcon />
        </IconButton>
      </Container>
    </Container>
  );
};

export default InsertGame;
