import {
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Messages from "../../../components/Messages";
import React from "react";
import { db } from "../../../firebase/config";

const Chat: React.FC<IMessageProps> = ({ gameIdProp, messageProp }) => {
  const messageProps: Game = messageProp ? JSON.parse(messageProp) : null;

  // console.log("gameIdProp: ", gameIdProp);
  // console.log("dbUserId: ", dbUserId);
  // console.log("MessageProps : ", messageProps);
  // console.log("gameIdProp: ", gameIdProp);

  return (
    <div>
      <Messages message={messageProps} />
    </div>
  );
};

export async function getServerSideProps({ params }: Params) {
  console.log("userParam: ", params);
  // const docRef = doc(db, "messages", params.id);
  // const docSnap = await getDoc(docRef);

  const messages = query(
    collectionGroup(db, "messages"),
    where("gameId", "==", params.id)
  );

  const newMessages: [] = [];
  const querySnapshots = await getDocs(messages);
  querySnapshots.forEach((doc) => {
    const messagesObj: ImessageObj = {
      messageId: doc.id,
      messages: doc.data(),
    };
    newMessages.push(messagesObj);
    console.log("querySnapshots", doc.id, " => ", doc.data());
  });
  console.log("newMessages: ", newMessages);

  if (newMessages.length > 0) {
    const messageProp = JSON.stringify(newMessages);

    return { props: { messageProp } };
  } else {
    console.log("No such document!");
    const gameIdProp = JSON.stringify(params);
    console.log("gameIdProp: ", gameIdProp);
    return { props: { gameIdProp } };
  }
}

export default Chat;
