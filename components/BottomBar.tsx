import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

const BottomBar = ({ userId, user }) => {
  const [inputs, setInputs] = useState({
    chatText: "",
  });

  const handleSubmitClick = async () => {
    try {
      await addDoc(collection(db, `chats/${userId}/messages`), {
        text: inputs.chatText,
        sender: user?.email,
        timestamp: serverTimestamp(),
      });
      setInputs({ ...inputs, chatText: "" });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleInputsChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  console.log("user: ", user);
  console.log("userId: ", userId);
  console.log("inputs: ", inputs.chatText);
  return (
    <Box
      className="bottom-chat-send-con"
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        position: "fixed",
        bottom: "0",
        backgroundColor: "#f5f5dc",
        borderTop: "0.9px solid black",
        padding: "4px 0 0 0",
      }}
    >
      <TextField
        id="chat-send-field"
        size="small"
        multiline
        maxRows={4}
        name="chatText"
        placeholder="Type a message"
        autoComplete="off"
        value={inputs.chatText}
        onChange={handleInputsChange}
        sx={{ width: "90%", height: "20px" }}
      />
      <IconButton
        className="bottom-send-btn"
        onClick={handleSubmitClick}
        sx={{ width: "10%", color: !inputs.chatText ? "inherit" : "red", marginLeft:'2px' }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default BottomBar;
