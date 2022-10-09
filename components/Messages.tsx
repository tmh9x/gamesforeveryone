import { Box, Container } from "@mui/system";
import { Button, TextField } from "@mui/material";
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
import { createContext, useContext, useEffect, useState } from "react";

import { InputSharp } from "@mui/icons-material";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

type Props = {};

const Messages = (props: Props) => {
  const { dbUsers, getDBUsers, user, dbUserId, messagedGameId } = useAuth();
  const gameId = localStorage.getItem("gameId");
  const [inputs, setInputs] = useState({
    chatText: "",
  });
  const messages = props.message.messages;
  const [chatMessages, setChatMessages] = useState<[]>([]);



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

    const messagesRef = await doc(db, "messages", dbUserId);
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
     console.log("selim");

     onSnapshot(doc(db, "messages", dbUserId), (doc) => {
       console.log("dbUserId: ", dbUserId && dbUserId);
       const data = doc.data();
       return setChatMessages(data.messages);
     });
  };
  useEffect(() => {
    console.log("dbUserId: ", dbUserId);

    dbUserId ? getMessages() : setChatMessages(messages);
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
      <Box sx={{ border: "solid 1px", margin: "1rem auto" }}>
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
      <Box className="chat_field">
        <TextField
          size="small"
          multiline
          minRows={2}
          maxRows={10}
          name="chatText"
          value={inputs.chatText}
          onChange={handleInputsChange}
          sx={{ width: "100%" }}
        ></TextField>
      </Box>
      <Button variant="outlined" onClick={handleSubmitClick}>
        insert message
      </Button>
    </Container>
  );
};

export default Messages;
