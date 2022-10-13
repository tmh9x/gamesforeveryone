import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";

import Image from "next/image";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import React from "react";
import { collection } from "@firebase/firestore";
import { db } from "../firebase/config";
import getOtherEmail from "../utils/getOtherEmail";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {};

const ChatSidebar = (props: Props) => {
  const { user } = useAuth();
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  console.log("chats: ", chats);
  const ChatParticipants = () => {
    return (
      (chats &&
      user) &&
      chats.filter(chat => chat.users.includes(user.email)).map((chat) => {
       
        return (
          
            <Box
              key={Math.random()}
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
                  {getOtherEmail(chat.users, user)}
                </Typography>
                <Typography m={1} mt={0} fontSize={8}>
                  messages texts
                </Typography>
              </Box>
            </Box>
        );
      })
    );
  };

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
        overflow={"auto"}
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
        </Box>
      </Box>
    </>
  );
};

export default ChatSidebar;
