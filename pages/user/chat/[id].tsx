import { doc, getDoc } from "firebase/firestore";

import Messages from "../../../components/Messages";
import type { NextPage } from "next";
import React from "react";
import { db } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext";

interface IMessageProps {
  messageId: string;
  messages;
}

const Chat = ({ messageProp }: any) => {
  console.log("messageProp: ", messageProp);
const { dbUserId,  } = useAuth();

const message: Game = messageProp ? JSON.parse(messageProp) : null;


console.log("dbUserId: ", dbUserId);
console.log("Message : ", message);
  return (
    <div>{message && <Messages message={message} />}</div>
  );
};

export async function getServerSideProps({ params }: Params) {
  // export async function getServerSideProps( {params}: {} ) {
  console.log("user param: ", params);
  // const docRef = doc(db, "messages", params.id);
  const docRef = doc(db, "messages", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const newMessage = {
      ...docSnap.data(),
      messageId: docSnap.id,
    };
    const messageProp = JSON.stringify(newMessage);
    console.log("gameJson: ", messageProp);
    console.log("Document data:", docSnap.data());
    return { props: { messageProp } };
  } else {
    console.log("No such document!");
    return { props: { messageProp: null } };
    // return { props: JSON.stringify({ messageProp: params.id }) };
  }
}

export default Chat;
