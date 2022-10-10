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

  const chatSendConRef = useRef<HTMLDivElement>(null);
  const currentRef = chatSendConRef.current;

  const [inputs, setInputs] = useState({
    chatText: "",
  });
  // const messages = message.messages;
  const [chatMessages, setChatMessages] = useState<[]>([]);

  //
  const getMultipleDocs = async () => {
    const messageRef = collection(db, "chat");

    // await Promise.all([
    //   addDoc(collection(messageRef, gameId, "messages"), {
    //     gameId: gameId,
    //     creatorId: user.uid,
    //     creatorEmail: user.email,
    //     time: Timestamp.fromDate(new Date()),
    //     messages: chatMessages.chatText ? chatMessages.chatText : "Text message-1",
    //   }),
    // ]);

    var queryWords = ["Text message-1", "Text message-2"];

    const museums = query(
      collectionGroup(db, "messages"),
      where("messages", "in", queryWords)
    );
    const querySnapshot = await getDocs(museums);
    querySnapshot.forEach((doc) => {
      console.log("querySnapshot", doc.id, " => ", doc.data());
    });

    // const museums = query(
    //   collectionGroup(db, "messages"),
    //   where("messages", "==", "Text message-1"),
    // );
    // const querySnapshot = await getDocs(museums);
    // querySnapshot.forEach((doc) => {
    //   console.log('querySnapshot',doc.id, " => ", doc.data());
    // });

    console.log("messageRef: ", messageRef);

    // const q = query(
    //   messageRef,
    //   where('messages.${', 'array-contains', {gameId: '7tvoPyYllWTqiW40UdB5'} )
    // );
    //   console.log("query: ", q);

    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const cities = [];
    //   const newMessage = [];
    //   querySnapshot.forEach((doc) => {
    //     cities.push(doc.data());
    //   });

    //  cities.forEach(message => {
    // message.messages.forEach((mes) => {
    //    newMessage.push(mes.gameId === "7tvoPyYllWTqiW40UdB5");
    //    newMessage.push(mes.gameId.includes("7tvoPyYllWTqiW40UdB5"));
    // return cities.push(mes.gameId === "7tvoPyYllWTqiW40UdB5");
    // console.log("getMultipleDocs: ", cities );
    // });

    // return cities.push(message);
  };

  // console.log("getMultipleDocs2: ", newMessage);

  //

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
    creatorEmail: user.email,
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

  const getMessages = async () => {
    try {
      onSnapshot(doc(db, "messages", dbUserId), (doc) => {
        console.log("dbUserId: ", dbUserId);
        const data = doc.data();
        console.log("data.messages: ", data);

        console.log("doc.exists(): ", doc.exists());
        if (doc.exists()) {
          return setChatMessages(data.messages);
        } else {
          setChatMessages([]);
        }
      });
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
    dbUserId && getMultipleDocs();
    // dbUserId ? getMessages() : setChatMessages(messages);
    dbUserId && getMessages();

    if (currentRef) {
      scrollToElement();
    }
    window.scrollTo({
      top: 1000000,
      behavior: "smooth",
    });
    console.log("currentRef: ", currentRef);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUserId]);

  // console.log("dbUsers: ", dbUsers && dbUsers);
  // console.log("user: ", user);
  console.log("UserId: ", dbUserId);
  // console.log("gameId: ", gameId);
  // console.log("inputs: ", inputs);
  // console.log("messages: ", messages);
  console.log("chatMessages: ", chatMessages);

  return (
    <Container className="chat_con">
      <Box
        className="text-con"
        sx={{ border: "solid 1px", margin: "1rem auto 0 auto" }}
      >
        {chatMessages.length > 0 ? (
          chatMessages.map((message, i) => {
            return message.gameId === gameId ? (
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
