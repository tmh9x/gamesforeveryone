import { useAuth } from "../context/AuthContext";

// const { user } = useAuth();



// ----- check if new chat participians exists --- //
  const chatExist = (messages, usr, mail) =>

  messages?.find(
    (chat) => chat.users.includes(usr.email) && chat.users.includes(mail)
  );
export default chatExist;
