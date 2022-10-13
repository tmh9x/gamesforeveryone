import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";

import Image from "next/image";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import React from "react";
import styled from "@emotion/styled";
import { useAuth } from "../context/AuthContext";

type Props = {};

const styles = () => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});

const ChatParticipants = () => {
    const { user } = useAuth();

  return (
    <Box
      className={"chat-list-box"}
      sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
    >
      <Avatar src="https://i.pravatar.cc/100" />
      <Box className={"chat-list-body"}>
        <Typography
          variant="body1"
          component="div"
          m={1}
          mb={0}
          mt={0}
          fontSize={9}
        >
          {user.email}
        </Typography>
        <Typography m={1} mt={0} fontSize={8}>
          Halil Esmer{" "}
        </Typography>
      </Box>
    </Box>
  );
};
const ChatSidebar = (props: Props) => {
    const { user } = useAuth();

  return (
    <>
      <Box
        className="sidebar-con"
        bgcolor="gray"
        width={"30%"}
        height={"80vh"}
        borderRight={"solid 1px blue"}
        display={"flex"}
        flexDirection={"column"}
        overflow={'auto'}

      >
        {user.email}
        <Box
          bgcolor="lightcoral"
          width={"100%"}
          height={"5vh"}
          className="sidebar-header-con"
          display={"flex"}
          justifyContent={"end"}
        >
          <IconButton>
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{ margin: "5px", padding: "4px", background: "#595252" }}
        >
          New Chat
        </Button>
        <Box
          className="chat-list-con"
          // overflowX={'scroll'}
          boxShadow={"16"}
          sx={{ scrollbarWidth: "none", overflowX: "auto" }}
        >
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
          <ChatParticipants />
        </Box>
      </Box>
    </>
  );
};

export default ChatSidebar;
