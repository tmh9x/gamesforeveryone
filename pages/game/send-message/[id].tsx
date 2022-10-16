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
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { useEffect, useRef, useState } from "react";

import Head from "next/head";
import SendIcon from "@mui/icons-material/Send";
import chatExist from "../../../utils/chatExist";
import { db } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";

type Props = {
  message: any;
};

const SendMessage: React.FC<Props> = ({ message }) => {
  const { dbUsers, getDBUsers, user, dbUserId, insertDoc } = useAuth();

  const gameId = localStorage.getItem("gameId");
  const sellerId = localStorage.getItem("sellerId");
  const sellerEmail = localStorage.getItem("sellerEmail");

  const chatSendConRef = useRef<HTMLDivElement>(null);
  const currentRef = chatSendConRef.current;
  const router = useRouter();
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

  // ------- use Firestore hooks ----------- //
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const handleInputsChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const newChatMsg = {
          text: inputs.chatText,
          sender: user?.email,
          gameId,
          timestamp: serverTimestamp(),
        };

  // ------------- insertDoc FS ------------- start //
  const handleSubmitClick = async () => {



const q = query(
  collection(db, "chats"),
  where("users", "array-contains", "test1@mail.de")
  
  // where("gameId", "in", ["3gYN58XShkaGkXz9rg5Q"])
  // where("users", 'in', ["test1@mail.de"])
  // whereField("users", isEqualTo: "test1@mail.de")
);

const querySnapshot = await getDocs(q);
const newMessages: Messages = [];

querySnapshot.forEach((doc) => {
  console.log("doc: ", doc);
  // doc.data() is never undefined for query doc snapshots
const messagesObj: Message = {
    ...(doc.data() as Message),
    messageId: doc.id,
  };
  newMessages.push(messagesObj);
});

const messageId = newMessages.map(id => id.messageId)
console.log("messageId: ", messageId[0]);
console.log("newMessages: ", newMessages);
    try {
      if (!chatExist(chats, user, sellerEmail) && sellerEmail !== user?.email) {
        const docRef = await addDoc(collection(db, "chats"), {
          gameId,
          users: [user?.email, sellerEmail, gameId],
        });
        await addDoc(collection(db, `chats/${docRef.id}/messages`), newChatMsg);
        router.push(`/game/details/${gameId}`);
      } else {
         try {
           await addDoc(
             collection(db, `chats/${messageId[0]}/messages`),
             newChatMsg
           );
           setInputs({ ...inputs, chatText: "" });
         } catch (error) {
           console.log("error add message: ", error);
         }
        console.log("check the mail ");
      }
    } catch (error) {
      console.log("error: ", error);
    }

    if (!inputs.chatText || !gameId || !dbUserId) {
      console.log("no text");
      return null;
    }
    // const messagesRef = collection(db, "chat");
    // try {
    //   await Promise.all([
    //     addDoc(collection(messagesRef, gameId, "messages"), newChatMsg),
    //   ]);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    //   setInputs({ ...inputs, chatText: "" });
    // } finally {
    //   getMessages();
    //   setInputs({ ...inputs, chatText: "" });
    //   scrollToElement();
    // }
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
        where("chatCreatorId", "==", dbUserId)
        // where("gameId", "==", gameId),
        // where("sellerEmail", "==", sellerEmail)
        // where("sellerId", "==", sellerId)
      );
      //delete it later!!
      const check =
        "V9aVj0sRcPh1QYwvjzTE 7tvoPyYllWTqiW40UdB5 LjYVCQDgV6dRffAVoUYShE5GsF22";

      const newMessages: Messages = [];
      const querySnapshots = await getDocs(messages);
      querySnapshots.forEach((doc) => {
        const messagesObj: Message = {
          ...(doc.data() as Message),
          messageId: doc.id,
        };
        newMessages.push(messagesObj);
      });

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

  console.log("dbUsers: ", dbUsers);
  // console.log("user: ", user);
  console.log("UserId: ", dbUserId);
  console.log("gameId: ", gameId);
  // console.log("inputs: ", inputs);
  console.log("chatMessages: ", chatMessages);
  console.log("inputs.chatText: ", inputs.chatText);

  return (
    <>
      <Head>
        <title>send a message</title>
      </Head>
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
    </>
  );
};

export default SendMessage;
