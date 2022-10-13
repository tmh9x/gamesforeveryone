import { Box, Container } from "@mui/system";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import ChatSidebar from "../../../components/ChatSidebar";
import Head from "next/head";
import SendIcon from "@mui/icons-material/Send";
import {auth} from '../../../firebase/config'
import { useAuth } from "../../../context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};

const Chat2 = (props: Props) => {
  const [inputs, setInputs] = useState({
    chatText: "",
  });
const {user} = useAuth();

  const handleInputsChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmitClick = () => {};
  
  
  //   console.log("inputs: ", inputs);
  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>
      <Container className="chat-con" sx={{ display: "flex" }}>
        <ChatSidebar />
        <Box
          className="chat-con-box"
          margin={"0 10px"}
          paddingTop={"10px"}
          display={"flex"}
          bgcolor={"#e6dbd7"}
          width={"70%"}
          height={"100vh"}
          flexDirection={"column"}
          sx={{ overflowX: "scroll" }}
        >
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#84ca97"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
            sx={{ alignSelf: "flex-end" }}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#84ca97"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
            sx={{ alignSelf: "flex-end" }}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#84ca97"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
            sx={{ alignSelf: "flex-end" }}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#84ca97"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
            sx={{ alignSelf: "flex-end" }}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>{" "}
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#b0daf0"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
          >
            <Typography variant="body2">Test chat </Typography>
          </Box>
          <Box
            display={"flex"}
            minWidth={"100px"}
            borderRadius="50px"
            bgcolor={"#84ca97"}
            padding="3px"
            margin={"1px"}
            width={"fit-content"}
            sx={{ alignSelf: "flex-end" }}
          >
            <Typography variant="body2">Test chat message</Typography>
          </Box>
        </Box>

        <Box
          className="chat-send-con"
          sx={{
            width: "100%",
            position: "fixed",
            bottom: "0",
            backgroundColor: "#f5f5dc",
            borderTop: "0.9px solid black",
            marginBottom: "1rem",
            padding: "4px 0 0 0",
          }}
        >
          <TextField
            id="chat-send-con"
            size="small"
            multiline
            maxRows={4}
            name="chatText"
            placeholder="Type a message"
            autoComplete="off"
            value={inputs.chatText}
            onChange={handleInputsChange}
            sx={{ width: "85%" }}
          ></TextField>
          <IconButton
            className="send-btn"
            onClick={handleSubmitClick}
            sx={{ width: "10%", color: !inputs.chatText ? "inherit" : "red" }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Container>
    </>
  );
};

export default Chat2;
