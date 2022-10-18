import { useAuth } from "../context/AuthContext";

// const { user } = useAuth();

// ----- check if new chat participians exists --- //
const chatExist = (messages, usr, sellerEmail, gameId) => {
  return messages?.find(
    (chat) =>
      chat.users.includes(usr.email) &&
      chat.users.includes(sellerEmail) &&
      chat.gameId.includes(gameId)
  );
};
export default chatExist;
