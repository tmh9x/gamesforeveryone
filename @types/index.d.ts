interface Game {
  title: string;
  price: number;
  creator: string;
  description: string;
  fsk: number;
  platform?: string[];
  year?: number;
  image: string;
  genre?: string[];
  amount: number;
  gameId?: string;
  img?: string;
  userId?: string;
}

type Games = Game[];
