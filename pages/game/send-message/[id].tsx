import { Box, Container } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { collection, serverTimestamp } from "firebase/firestore";

import Head from "next/head";
import SendIcon from "@mui/icons-material/Send";
import { SendMessageHook } from "../../../utils/sendMessageHook";
import { db } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  message: any;
};

const SendMessage: React.FC<Props> = ({ message }) => {
  const { user } = useAuth();

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
    timestamp: serverTimestamp(),
  };

  // ------------- send message / FS ------------- start //
  const handleSubmitClick = async () => {
  console.log("user.chats: ", chats);

    try {
      await SendMessageHook(chats, gameId, user, sellerEmail, newChatMsg);
      goBack();
      setInputs({ ...inputs, chatText: "" });
    } catch (error) {
      console.log("error add message: ", error);
    }
  };

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
