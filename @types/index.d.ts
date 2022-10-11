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
  creatorEmail: string;
  creatorId: string;
  gameId: string;
  message: string;
  time: date | undefined;
  buyerId: string;
  sellerId: string;
}
type Messages = Message[];
