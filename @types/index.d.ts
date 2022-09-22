interface Game {
  title: string;
  price: number;
  creator: string;
  description: string;
  fsk: number;
  platform: string;
  year: Date;
  image: string;
  genre: string;
  amount: number;
}

type Games = Game[];
