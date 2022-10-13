import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { addDoc, collection } from "@firebase/firestore";

import Image from "next/image";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import React from "react";
import { db } from "../firebase/config";
import getOtherEmail from "../utils/getOtherEmail";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

type Props = {};

const ChatSidebar = (props: Props) => {
  const { user } = useAuth();
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/user/chat2/${id}`);
  };

  // ----- check if new chat participians exists --- //
  const chatExist = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("enter email of chat recipient");
    if (!chatExist(input) && input !== user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    } else {
      console.log("check the mail ");
    }
  };

  console.log("chats: ", chats);
  const ChatParticipants = () => {
    return (
      chats &&
      user &&
      chats
        .filter((chat) => chat.users.includes(user.email))
        .map((chat) => (
          <Box
            key={Math.random()}
            className={"chat-list-box"}
            onClick={() => {
              redirect(chat.id);
            }}
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
        ))
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
          onClick={() => newChat()}
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
