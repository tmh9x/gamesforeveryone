import {
  Box,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import AddIcon from "@mui/icons-material/Add";
import { HTMLInputTypeAttribute } from "react";
import SnackbarMui from "./alerts/SnackbarMui";
import { db } from "../firebase/config";
import { storage } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
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
type InputBaseProps = {
  type?: HTMLInputTypeAttribute;
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
  const [imageUpload, setImageUpload] = useState<File>();
  const [inputValues, SetInputValues] = useState<string[]>([]);
  const [isErrorField, setIsErrorField] = useState<boolean>(false);

  const { user, dbUsers, setOpenSnackBar, setAlerTxt1 } = useAuth();
  let myuuid = uuidv4();
  const router = useRouter();
  const theme = useTheme();
  const noImage =
    "https://eingleses.com/wp-content/uploads/2019/07/no-image.jpg";
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | SelectChangeEvent<HTMLSelectElement>
  ) => {
    const {
      target: { value },
    } = event;

    setGameData({
      ...gameData,
      userId: user.uid,
      sellerEmail: user.email,
      sellerPhone: dbUsers.phone,
      [event.target.name]: typeof value !== "string" ? value : value.trim(),
    });
  };

  const handleInsertGameClick = async () => {
    setIsErrorField(false);

    if (
      !gameData.platform ||
      !gameData.title ||
      !gameData.genre ||
      !gameData.description ||
      !gameData.price
    ) {
      setIsErrorField(true);
      setAlerTxt1("Please check your inputs!");
      setOpenSnackBar(true);
      setTimeout(() => {
        setOpenSnackBar(false);
      }, 2000);
      return;
    }
    try {
      const metadata = {
        contentType: "image/jpeg",
      };

      if (imageUpload) {
        const storageRef = ref(
          storage,
          "game-images/" + imageUpload.name + myuuid
        );

        const uploadTask = uploadBytesResumable(
          storageRef,
          imageUpload,
          metadata
        );

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

              // GAME DATA UPLOAD

              addDoc(collection(db, "games"), newGame).then(async (docId) => {
                console.log("Document written with ID: ", docId.id);

                const gamesRef = doc(db, "games", docId.id);

                // Set the "capital" field of the city 'DC'
                await updateDoc(gamesRef, {
                  gameId: docId.id,
                });
              });

              router.push(`/user/profile`);
              setAlerTxt1("Game successfully inserted!");
              setOpenSnackBar(true);
            });
          }
          // GAME DATA UPLOAD ends -------///
        );
      } else {
        // GAME DATA UPLOAD starts -------///
        addDoc(collection(db, "games"), { ...gameData, image: noImage }).then(
          async (docId) => {
            console.log("Document written with ID: ", docId.id);
            router.push(`/user/profile`);
            setAlerTxt1("Game successfully inserted!");
            setOpenSnackBar(true);
          }
        );
      }

      // GAME DATA UPLOAD ends -------///
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // console.log("user", user);
  // console.log("gameData", gameData);
  // console.log("dbUsers: ", dbUsers);
  // console.log("imageUpload: ", imageUpload);

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
            error={isErrorField}
            name="platform"
            label="platforms"
            value={gameData.platform ? gameData.platform : ""}
            onChange={(event: SelectChangeEvent<typeof gameData.platform>) =>
              handleChange(event)
            }
          >
            {platforms.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          error={isErrorField}
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
            error={isErrorField}
            name="genre"
            value={gameData.genre ? gameData.genre : inputValues}
            onChange={(event: SelectChangeEvent<typeof gameData.genre>) =>
              handleChange(event)
            }
            input={<OutlinedInput id="select-multiple-genre" label="Genre" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: string) => (
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
          fullWidth
        />
        <TextField
          sx={{ backgroundColor: "#fff", marginBottom: "1em" }}
          multiline
          error={isErrorField}
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
          error={isErrorField}
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
      <SnackbarMui />
    </Container>
  );
};

export default InsertGame;
