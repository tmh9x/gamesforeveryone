import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import {
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import ChatSidebar from "../../../components/ChatSidebar";
import Image from "next/image";
import { db } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext";

type Props = {};

const MessagesList = (props: Props) => {
  const noImage =
    "https://eingleses.com/wp-content/uploads/2019/07/no-image.jpg";
    const {user}= useAuth();
  // const unsub = onSnapshot(doc(db, "chat", "7tvoPyYllWTqiW40UdB5"), (doc) => {
  //   console.log("Current data: ", doc.data());
  // });
  const getMessages = async () => {
    try {
      const messages = query(
        collectionGroup(db, "messages"),
        where("sellerEmail", "==", user.email)
      );

      const newMessages: Messages = [];
      const querySnapshots = await getDocs(messages);
      querySnapshots.forEach((doc) => {
        const messagesObj: Message = {
          ...(doc.data() as Message),
          messageId: doc.id,
        };
        newMessages.push(messagesObj);
      });
      console.log("newMessages: ", newMessages);

      if (newMessages.length > 0) {
        console.log("got messages");
      } else {
        console.log("no messages");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      console.log("finally");
    }
  };
  useEffect(() => {
    getMessages();
  }, []);


        console.log("user: ", user);

  return (
    <>
      <Container className="chat-list-con">
        <Box
          className="chat-list-box"
          sx={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "gray solid 0.1px",
            margin: "15px auto 10px auto",
            paddingBottom: "15px",
          }}
        >
          <div className="chat-list-box-photo" style={{ marginRight: "10px" }}>
            <Image
              src={noImage}
              alt="game-photo"
              width="50px"
              height="50px"
              style={{ borderRadius: "99999px" }}
            />
          </div>

          <div className="chat-list-box-body">
            <div className="chat-list-box-header">
              Header: Message receiver - last time
            </div>
            <div className="chat-list-box-title">Title</div>
            <div
              className="chat-list-box-message-box"
              style={{ fontSize: "14px", color: "grey" }}
            >
              <p>Message box Message box Message box Message box</p>
            </div>
          </div>
        </Box>
      </Container>
    <Container>
        <ChatSidebar/>
    </Container>
    </>
  );
};

export default MessagesList;
