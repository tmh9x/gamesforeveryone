import { Box, Container } from "@mui/system";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import {
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
  where,
} from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

import Head from "next/head";
import SendIcon from "@mui/icons-material/Send";
import chatExist from "../../../utils/chatExist";
import { db } from "../../../firebase/config";
import { sendMessageHook } from "../../../utils/sendMessageHook";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  message: any;
};

const SendMessage: React.FC<Props> = ({ message }) => {
  const { dbUsers, getDBUsers, user, dbUserId, insertDoc } = useAuth();

  const gameId = localStorage.getItem("gameId");
  const sellerEmail = localStorage.getItem("sellerEmail");

  const router = useRouter();
  const [inputs, setInputs] = useState({
    chatText: "",
  });

  // ------- use Firestore hooks / get chats collection ----------- //
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const handleInputsChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value.trim() });
  };

  const goBack = () => router.back();

  const newChatMsg = {
    text: inputs.chatText.trim(),
    sender: user?.email,
    gameId,
    timestamp: serverTimestamp(),
  };

  // ------------- send message / FS ------------- start //
  const handleSubmitClick = async () => {
    try {
      await sendMessageHook(
        gameId,
        user,
        chats,
        sellerEmail,
        newChatMsg,
        inputs
      );
      goBack();
    } catch (error) {
      console.log("error add message: ", error);
    }
  };
  // const handleSubmitClick = async () => {
  //   const q = query(
  //     collection(db, "chats"),
  //     where("users", "array-contains", user.email),
  //     where("gameId", "==", gameId)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   const newMessages: Messages = [];

  //   querySnapshot.forEach((doc) => {
  //     const messagesObj: Message = {
  //       ...(doc.data() as Message),
  //       messageId: doc.id,
  //     };
  //     newMessages.push(messagesObj);
  //   });

  //   const messageId = newMessages.map((id) => id.messageId);
  //   console.log("newMessages: ", newMessages);

  //   try {
  //     if (
  //       !chatExist(chats, user, sellerEmail, gameId) &&
  //       sellerEmail !== user?.email
  //     ) {
  //       const docRef = await addDoc(collection(db, "chats"), {
  //         gameId,
  //         users: [user?.email, sellerEmail],
  //       });
  //       await addDoc(collection(db, `chats/${docRef.id}/messages`), newChatMsg);
  //       setInputs({ ...inputs, chatText: "" });
  //       goBack();
  //     } else {
  //       await addDoc(
  //         collection(db, `chats/${messageId[0]}/messages`),
  //         newChatMsg
  //       );
  //       setInputs({ ...inputs, chatText: "" });
  //       goBack();
  //     }
  //   } catch (error) {
  //     console.log("error add message: ", error);
  //   }

  //   if (!inputs.chatText.trim() || !gameId || !dbUserId) {
  //     console.log("no text");
  //     return null;
  //   }
  // };
  // ------------- send message / FS ------------- ends //

  // console.log("dbUsers: ", dbUsers);
  // // console.log("user: ", user);
  // console.log("UserId: ", dbUserId);
  // console.log("gameId: ", gameId);
  // console.log("inputs.chatText: ", inputs.chatText);

  return (
    <>
      <Head>
        <title>send a message</title>
      </Head>
      <Container className="chat_con">
        <Box
          marginTop={3}
          sx={{ display: "flex", justifyContent: "space-between" }}
          className="send-message-header"
        >
          <Button
            variant="contained"
            color={"inherit"}
            className="cancel-btn"
            onClick={goBack}
          >
            Cancel
          </Button>
          <Typography variant="h5">Message</Typography>
          <Button
            variant="contained"
            disabled={inputs.chatText.length < 2}
            color={!inputs.chatText ? "inherit" : "primary"}
            className="send-btn"
            onClick={handleSubmitClick}
            sx={{ paddingRight: "0.3rem" }}
          >
            Send
            <SendIcon className="send-icon" sx={{ marginLeft: "0.3rem" }} />
          </Button>
        </Box>

        <Box
          className="text-con"
          sx={{ border: "solid 1px", margin: "1rem auto 0 auto" }}
        ></Box>
        <Box
          className="chat-send-con"
          sx={{
            width: "100%",
            marginTop: "0.6rem",
            backgroundColor: "white",
            padding: "4px 0 0 0",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{sellerEmail}</Typography>

          <TextField
            id="chat-send-field"
            size="small"
            multiline
            minRows={12}
            // maxRows={50}
            name="chatText"
            value={inputs.chatText}
            onChange={handleInputsChange}
            placeholder={`Write a friendly message to ${sellerEmail} and get more attention!`}
            sx={{ width: "85%", marginTop: "1rem" }}
          ></TextField>
        </Box>
      </Container>
    </>
  );
};

export default SendMessage;
