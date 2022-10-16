import { Box, Container } from "@mui/system";
import { Button, IconButton, TextField } from "@mui/material";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

type Props = {
  message: any;
};

const Messages: React.FC<Props> = ({ message }) => {
  const { dbUsers, getDBUsers, user, dbUserId } = useAuth();
  const gameId = localStorage.getItem("gameId");
  const sellerId = localStorage.getItem("sellerId");
  const sellerEmail = localStorage.getItem("sellerEmail");

  const chatSendConRef = useRef<HTMLDivElement>(null);
  const currentRef = chatSendConRef.current;

  const [inputs, setInputs] = useState({
    chatText: "",
  });
  const [chatMessages, setChatMessages] = useState<Messages>([]);

  const scrollToElement = () => {
    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleInputsChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const newChatMsg = {
    gameId,
    chatCreatorId: dbUserId,
    sellerId: sellerId,
    // buyerId: dbUserId,
    message: inputs.chatText,
    chatBeginnerEmail: user.email !== sellerEmail ? user.email : '',
    time: Timestamp.fromDate(new Date()),
  };
  // ------------- insertDoc FS ------------- start //
  const handleSubmitClick = async () => {
    console.log("newChatMsg: ", newChatMsg);
    if (!inputs.chatText || !gameId || !dbUserId) {
      console.log("no text");
      return null;
    }
    const messagesRef = collection(db, "chat");
    try {
      await Promise.all([
        addDoc(collection(messagesRef, gameId, "messages"), newChatMsg),
      ]);
    } catch (e) {
      console.error("Error adding document: ", e);
      setInputs({ ...inputs, chatText: "" });
    } finally {
      getMessages();
      setInputs({ ...inputs, chatText: "" });
      scrollToElement();
    }
  };
  // ------------- handleSubmitClick FS ------------- ends //

  // -------- Convert Time ------------- ////
  const convertTime = (time: { seconds: number; nanoseconds: number }) => {
    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000
    );

    const date = fireBaseTime.toLocaleDateString();
    const atTime = fireBaseTime.toLocaleTimeString();
    const dateAndTime = { date, atTime };
    return dateAndTime;
  };

  const getMessages = async () => {
    try {
      const messages = query(
        collectionGroup(db, "messages"),
        where("gameId", "==", "V9aVj0sRcPh1QYwvjzTE"),
        where("sellerId", "==", "pB6tqJugoHc2WcHmiZjDD4LFQD82"),
        where("chatBeginnerEmail", "==", "test@mail.de"),
        where("chatCreatorId", "==", dbUserId),
        // where("gameId", "==", gameId),
        // where("sellerEmail", "==", sellerEmail)
        // where("sellerId", "==", sellerId)
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
        return setChatMessages(newMessages);
      } else {
        setChatMessages([]);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setInputs({ ...inputs, chatText: "" });
    } finally {
      scrollToElement();
    }
  };

  useEffect(() => {
    console.log("dbUserId: ", dbUserId);
    console.log("useEffect fired!");
    dbUserId && getMessages();

    if (currentRef) {
      scrollToElement();
    }

    window.scrollTo({
      top: 1000000,
      behavior: "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUserId]);

  console.log("dbUsers: ",  dbUsers);
  // console.log("user: ", user);
  console.log("UserId: ", dbUserId);
  console.log("gameId: ", gameId);
  console.log("chatText: ", inputs.chatText);
  console.log("chatMessages: ", chatMessages);

  return (
    <Container className="chat_con">
      <Box
        className="text-con"
        sx={{ border: "solid 1px", margin: "1rem auto 0 auto" }}
      >
        {chatMessages.length > 0 ? (
          chatMessages.map((message, i) => {
            console.log("message: ", message);
            return message.gameId === gameId ? (
              <div
                className="message-box"
                key={i}
                style={
                  message.creatorId === dbUserId
                    ? {
                        display: "flex",
                        border: "solid 1px",
                        borderRight: "unset",
                        alignItems: "center",
                        justifyContent: "end",
                        paddingRight: "0.6rem",
                      }
                    : {
                        display: "flex",
                        border: "solid 1px",
                        borderRight: "unset",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingRight: "0.6rem",
                      }
                }
                // style={{
                //   display: "flex",
                //   border: "solid 1px",
                //   borderRight: "unset",
                //   alignItems: "center",
                //   justifyContent: "end",
                //   paddingRight: "0.6rem",
                // }}
              >
                <p className="message-paragraph">
                  {convertTime(message.time).date}
                  <br />
                  {convertTime(message.time).atTime}
                  <br />
                  {message.message}
                </p>
              </div>
            ) : (
              <div style={{ background: "red" }}>No Data</div>
            );
          })
        ) : (
          <div style={{ background: "grey" }}>No Data</div>
        )}
      </Box>

      <div className="place-holder" style={{ height: "4rem" }}></div>

      <div ref={chatSendConRef}></div>

      <Box
        className="chat-send-con"
        sx={{
          width: "100%",
          position: "fixed",
          bottom: "0",
          backgroundColor: "white",
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
          value={inputs.chatText}
          onChange={handleInputsChange}
          sx={{ width: "85%" }}
        ></TextField>
        {
          <IconButton
            className="send-btn"
            onClick={handleSubmitClick}
            sx={{ width: "10%", color: !inputs.chatText ? "inherit" : "red" }}
          >
            <SendIcon />
          </IconButton>
        }
      </Box>
    </Container>
  );
};

export default Messages;
