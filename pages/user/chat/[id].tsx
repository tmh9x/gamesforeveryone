import { doc, getDoc } from "firebase/firestore";

import Messages from "../../../components/Messages";
import type { NextPage } from "next";
import React from "react";
import { db } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext";

const Chat: React.FC<IMessageProps> = ({ userIdProp, messageProp }) => {
  const { dbUserId } = useAuth();

  const message: Game = messageProp ? JSON.parse(messageProp) : null;
  const userId: Game = userIdProp ? JSON.parse(userIdProp) : null;

  console.log("userIdProp: ", userIdProp);
  console.log("dbUserId: ", dbUserId);
  console.log("Message : ", message);
  // console.log("userIdProp: ", userIdProp);

  return (
    <div>
 <Messages message={message}/>
      {/* {message && <Messages message={message}  />} */}
    </div>
  );
};

export async function getServerSideProps({ params }: Params) {
  console.log("user param: ", params);
  const docRef = doc(db, "messages", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const newMessage = {
      ...docSnap.data(),
      messageId: docSnap.id,
    };
    const messageProp = JSON.stringify(newMessage);

    console.log("messageProp: ", messageProp);
    console.log("Document data:", docSnap.data());
    return { props: { messageProp } };
  } else {
    console.log("No such document!");
    const userIdProp = JSON.stringify(params);
    console.log("userIdProp: ", userIdProp);
    return { props: { userIdProp } };
  }
}

export default Chat;
