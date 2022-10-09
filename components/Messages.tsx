import { Box, Container } from "@mui/system";
import { Button, IconButton, TextField } from "@mui/material";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
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

type Props = {
  message: any;
  children: any;
};

const Messages: React.FC<Props> = ({ message, children }) => {
  const { dbUsers, getDBUsers, user, dbUserId, messagedGameId } = useAuth();
  const gameId = localStorage.getItem("gameId");

  const chatSendConRef = useRef<HTMLDivElement>(null);
  const currentRef = chatSendConRef.current;

  const [inputs, setInputs] = useState({
    chatText: "",
  });
  const messages = message.messages;
  const [chatMessages, setChatMessages] = useState<[]>([]);

  const scrollToElement = () => {
    if (currentRef) {
      console.log("currentRef: ", currentRef);
      currentRef.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleInputsChange = (e: any) => {
    // const value = e.target.value;
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const newChatMsg = {
    gameId,
    creatorId: dbUserId,
    time: Timestamp.fromDate(new Date()),
    message: inputs.chatText,
  };
  // ------------- insertDoc FS ------------- start //
  const handleSubmitClick = async () => {
    if (!inputs.chatText || !gameId || !dbUserId) {
      console.log("no text");
      return null;
    }

    const messagesRef = doc(db, "messages", dbUserId);
    const docSnap = await getDoc(messagesRef);

    try {
      if (docSnap.exists()) {
        await updateDoc(doc(db, "messages", dbUserId), {
          messages: arrayUnion(newChatMsg),
        });
      } else {
        await setDoc(doc(db, "messages", dbUserId), {
          messages: arrayUnion(newChatMsg),
        });
      }

      setChatMessages([]);
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
  const convertTime = (time: {}) => {
    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000
    );

    // const date = fireBaseTime.toDateString();
    const date = fireBaseTime.toLocaleDateString();
    const atTime = fireBaseTime.toLocaleTimeString();
    const dateAndTime = { date, atTime };
    return dateAndTime;
  };

  const getMessages = () => {
    onSnapshot(doc(db, "messages", dbUserId), (doc) => {
      console.log("dbUserId: ", dbUserId && dbUserId);
      const data = doc.data();
      return setChatMessages(data.messages);
    });
  };

  useEffect(() => {
    dbUserId ? getMessages() : setChatMessages(messages);

    if (currentRef) {
      scrollToElement();
    }
    window.scrollTo({
      top: 1000000,
      behavior: "smooth",
    });
    console.log("currentRef: ", currentRef);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("dbUsers: ", dbUsers && dbUsers);
  // console.log("user: ", user);
  // console.log("UserId: ", dbUserId);
  // console.log("gameId: ", gameId);
  // console.log("inputs: ", inputs);
  console.log("messages: ", messages);
  console.log("chatMessages: ", chatMessages);

  return (
    <Container className="chat_con">
      <Box
        className="text-con"
        sx={{ border: "solid 1px", margin: "1rem auto 0 auto" }}
      >
        {chatMessages &&
          chatMessages.map((message, i) => {
            return (
              <div
                className="message-box"
                key={i}
                style={{
                  display: "flex",
                  border: "solid 1px",
                  borderRight: "unset",

                  alignItems: "center",
                  justifyContent: "end",
                  paddingRight: "0.6rem",
                }}
              >
                <p
                  className="message-paragraph"
                  // style={{width:'fit-content', position}}
                >
                  {" "}
                  {console.log("dataAndTime", convertTime(message.time).date)}
                  {/* {message.time.seconds} */}
                  {convertTime(message.time).date}
                  <br />
                  {convertTime(message.time).atTime}
                  <br />
                  {message.message}
                </p>
              </div>
            );
          })}
      </Box>
      <div style={{ height: "4rem" }} ></div>
      <div ref={chatSendConRef}></div>
      <Box
        className="chat-send-con"
        sx={{
          width: "100%",
          position: "fixed",
          bottom: "0",
          backgroundColor: "white",
          borderTop: "0.3 solid black",
          padding: "4px 0 0 0",
        }}
      >
        <TextField
          id="chat-send-con"
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
