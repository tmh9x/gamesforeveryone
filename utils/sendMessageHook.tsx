import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import chatExist from "./chatExist";
import { db } from "../firebase/config";

// ------------- send message / FS ------------- start //
const SendMessageHook = async (
  chats,
  gameId,
  user,
  sellerEmail,
  newChatMsg
) => {
  console.log("user.email: ", chats, gameId, user, sellerEmail, newChatMsg);
  const q = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email),
    where("gameId", "==", gameId)
  );

  const querySnapshot = await getDocs(q);
  const newMessages: Messages = [];

  querySnapshot.forEach((doc) => {
    const messagesObj: Message = {
      ...(doc.data() as Message),
      messageId: doc.id,
    };
    newMessages.push(messagesObj);
  });

  const messageId = newMessages.map((id) => id.messageId);
  try {
    if (
      !chatExist(chats, user, sellerEmail, gameId) &&
      sellerEmail !== user?.email
    ) {
      const docRef = await addDoc(collection(db, "chats"), {
        gameId,
        users: [user?.email, sellerEmail],
      });
      await addDoc(collection(db, `chats/${docRef.id}/messages`), newChatMsg);
    } else {
      await addDoc(
        collection(db, `chats/${messageId[0]}/messages`),
        newChatMsg
      );
    }
  } catch (error) {
    console.log("error add message: ", error);
  }
};
// ------------- send message / FS ------------- ends //
export { SendMessageHook };
