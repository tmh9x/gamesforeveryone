interface Game {
  title?: string;
  price?: number;
  creator?: string;
  description?: string;
  fsk?: number;
  platform?: string[];
  year?: number;
  image: string;
  genre?: string[];
  amount?: number;
  gameId?: string;
  image?: string;
  userId?: string;
}

type Games = Game[];

// ------------- used for edit-user.tsx ---- -- starts
  type TEditedUserData = {
    username?: string;
    first_name?: string;
    last_name?: string;
    birthday?: string;
    gender?: string;
    street?: string;
    postcode?: number;
    city?: string;
    phone?: number;
    email?: string;
    authId?: string;
    id?: string;
  };


interface Params {
  params: { id: string };
}
interface GameProps {
  gameProp: string | null;
}

interface IMessageProps {
  gameIdProp: string;
  messageProp: string;
}

interface Message {
  messageId: string;
  sender: string;
  gameId: string;
  message: string;
  time: date | undefined;
}
type Messages = Message[];


