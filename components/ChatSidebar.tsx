import { Avatar, Box, Typography } from "@mui/material";

import React from "react";
import { collection } from "@firebase/firestore";
import { db } from "../firebase/config";
import getOtherEmail from "../utils/getOtherEmail";
import { useAuth } from "../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

const ChatSidebar: React.FC = () => {
  const { user } = useAuth();
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats: Chats = snapshot?.docs.map((doc) => {
    console.log("doc.data(): ", doc.data());

    return { ...doc.data(), id: doc.id };
  }) as Chats;
  // const chats: Chats = snapshot?.docs.map((doc) => {
  //   console.log("doc.id: ", doc.id);
  //   console.log("doc.data(): ", doc.data());

  //   return { ...doc.data(), id: doc.id };
  // });
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
                padding: "20px 20px",
              }}
            >
              <Avatar
                src="/broken-image.jpg"
                sx={{ width: "50px", height: "50px" }}
              />
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
                  last message
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
        width={params.id === "messages" ? "100%" : "30%"}
        height={"80vh"}
        display={params.id !== "messages" ? "none" : "flex"}
        flexDirection={"column"}
        overflow={"auto"}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#303030",
            color: "#fff",
            padding: "0.5em",
            height: "24px",
          }}
        >
          {user.email}
        </Box>

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
