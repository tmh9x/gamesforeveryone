import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { auth, db } from "../../../firebase/config";
import { collection, doc, orderBy, query } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import BottomBar from "../../../components/BottomBar";
import ChatSidebar from "../../../components/ChatSidebar";
import Head from "next/head";
import { convertFirebaseTime } from "../../../utils/convertFirebaseTime";
import { formatDateDdMmYyyy } from "../../../utils/formatData";
import getOtherEmail from "../../../utils/getOtherEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type Props = {};

const Chat = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);

  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const params = router.query;

  const queryChat = doc(db, "chats", id);
  const [chat] = useDocumentData(queryChat);
  //   const [chat] = useDocumentData(doc(db, "chats", id));

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
                textAlign:'center'
              }}
              maxWidth={"75%"}
              minWidth={"20px"}
              borderRadius={sender ? "0px 10px 0px 10px" : "10px 0px 10px 0px"}
              bgcolor={sender ? "#84ca97" : "#64becb"}
              padding="3px"
              margin={"5px 5px 0 5px"}
              width={"fit-content"}
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
                {' | '}
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
      <Container className="chat-con" sx={{ display: "flex" }}>
        <>
          <ChatSidebar />

          <Box
            className="chat-text-con"
            sx={{
              display: params.id === "messages" ? "none" : "flex",
              flexDirection: "column",
              backgroundColor: "#faebd7",
            }}
            width={"100%"}
            height={"850vh"}
          >
            <Box className="chat-con-header" bgcolor={"#5f9ea0"}>
              <Button variant="contained" onClick={goBack}>
                Back
              </Button>{" "}
              {getOtherEmail(chat?.users, user)}
            </Box>

            {/* {params.id === "messages" && (
              <Typography align="center" mt={10}>
                Please beginn new chat
                <br />
                or
                <b />
                select a chat participian
              </Typography>
            )} */}
            {params.id !== "messages" && getMessages()}
          </Box>

          {params.id !== "messages" && <BottomBar userId={id} user={user} />}
        </>
      </Container>
    </>
  );
};

export default Chat;
