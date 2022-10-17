import { Avatar, Box, Typography } from "@mui/material";

import React from "react";
import { collection } from "@firebase/firestore";
import { db } from "../firebase/config";
import getOtherEmail from "../utils/getOtherEmail";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

type Props = {};
// doc: if you decide to use on bigger screen, you can change the display size to i.e. 30%
const ChatSidebar = (props: Props) => {
  const { user } = useAuth();
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();
  const params = router.query;
  const chatExist =
    chats && user && chats.filter((chat) => chat.users.includes(user.email));

  const redirect = (chatDocId: string) => {
    console.log("redirectid: ", chatDocId);
    router.push(`/user/chat/${chatDocId}`);
  };

  console.log("chatsSidebar: ", chats);
  console.log("chatExist: ", chatExist);

  const ChatParticipants = () => {
    return (
      chats &&
      user &&
      chats
        .filter((chat) => chat.users.includes(user.email))
        .map((chat) => {
          console.log("chatMap: ", chat);
          return (
            <Box
              key={Math.random()}
              className="chat-list-box"
              onClick={() => {
                redirect(chat.id);
              }}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                background: "#a9a9a9",
                margin: "5px 1px",
              }}
            >
              <Avatar src="/broken-image.jpg" />
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
        width={params.id === "messages" ? "100%" : "30%"}
        height={"80vh"}
        borderRight={"solid 1px blue"}
        display={params.id !== "messages" ? "none" : "flex"}
        flexDirection={"column"}
        overflow={"auto"}
      >
        {user.email}
        <Box
          className="sidebar-header-con"
          bgcolor="lightcoral"
          width={"100%"}
          height={"5vh"}
          display={"flex"}
          justifyContent={"end"}
        ></Box>

        <Box
          className="chat-list-con"
          boxShadow={"16"}
          sx={{ scrollbarWidth: "none", overflowX: "auto" }}
        >
          {chatExist && chatExist.length > 0 ? (
            <ChatParticipants />
          ) : (
            <Box display={"flex"} justifyContent="center">
              You have no chat yet
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChatSidebar;
