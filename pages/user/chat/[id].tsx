import { Box, Container } from "@mui/system";
import { Button, IconButton, Typography } from "@mui/material";
import {
  DocumentReference,
  collection,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../../firebase/config";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BottomBar from "../../../components/BottomBar";
import ChatSidebar from "../../../components/ChatSidebar";
import Head from "next/head";
import { convertFirebaseTime } from "../../../utils/convertFirebaseTime";
import { formatDateDdMmYyyy } from "../../../utils/formatData";
import getOtherEmail from "../../../utils/getOtherEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const Chat = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);

  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const params = router.query;

  const queryChat = doc(db, "chats", id);
  console.log("queryChat: ", queryChat);
  const [chat] = useDocumentData(queryChat);

  const goBack = () => {
    router.back();
  };

  const getMessages = () => {
    return messages?.map((message) => {
      const sender = message.sender === user?.email;

      console.log(
        "convert2: ",
        convertFirebaseTime(message?.timestamp !== null && message?.timestamp)
      );
      return (
        <>
          <Box
            key={Math.random()}
            display={"flex"}
            sx={{
              alignSelf: sender ? "flex-end" : "flex-start",
              flexDirection: "column",
            }}
          >
            <Box
              className="chat-text-box"
              display={"flex"}
              sx={{
                alignSelf: sender ? "flex-end" : "flex-start",
                flexDirection: "column",
                textAlign: "center",
                maxWidth: "75%",
                minWidth: "20px",
                borderRadius: "5px",
                padding: "5px",
                margin: "5px 5px 0 5px",
              }}
              bgcolor={sender ? "#84ca97" : "#64becb"}
            >
              <Typography
                variant="body2"
                className="text-field"
                sx={{ overflow: "overlay" }}
              >
                {message.text}
              </Typography>
            </Box>

            <span
              className="message-date-time"
              style={{
                display: "flex",
                alignSelf: sender ? "flex-end" : "flex-start",
                flexDirection: "column",
                fontSize: "0.5rem",
                justifyContent: "end",
                margin: "0 6px 0 6px",
              }}
            >
              {message?.timestamp !== null &&
                message?.timestamp !== undefined &&
                convertFirebaseTime(message?.timestamp)?.date}
              {" | "}
              {message?.timestamp !== null &&
                message?.timestamp !== undefined &&
                convertFirebaseTime(message?.timestamp)?.atTime}
            </span>
          </Box>
        </>
      );
    });
  };

  //   console.log("chat-id: ", id);
  //   console.log("messagesttttt: ", messages);
  //   console.log("userChatId: ", user);
  console.log("messages: ", messages);

  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>
      <Box className="chat-con" sx={{ display: "flex" }}>
        <>
          <ChatSidebar />

          <Box
            className="chat-text-con"
            sx={{
              display: params.id === "messages" ? "none" : "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              className="chat-con-header"
              sx={{
                display: "flex",
                backgroundColor: "#303030",
                color: "#fff",
              }}
            >
              <IconButton onClick={goBack}>
                <ArrowBackIosIcon sx={{ color: "#fff" }} />
              </IconButton>
              <Typography sx={{ padding: "0.5em 0" }}>
                {getOtherEmail(chat?.users, user)}
              </Typography>
            </Box>
            {params.id !== "messages" && getMessages()}
          </Box>
          {params.id !== "messages" && <BottomBar userId={id} user={user} />}
        </>
      </Box>
    </>
  );
};

export default Chat;
