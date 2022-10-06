import { db, storage } from "../firebase/config";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";

import Carousel from "../components/Carousel";
import GameCard from "../components/GameCard";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
  console.log("db", db);

  const [imageList, setImageList] = useState<string[]>([]);

  const { getGames, games } = useAuth();

  const imageListRef = ref(storage, "/game-images");

  useEffect(() => {
    getGames();
    listAll(imageListRef).then((response) => {
      console.log("response", response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url: string) => {
          setImageList((prev: any) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("games", games);

  return (
    <div className={styles.container}>
      <Carousel />
      {games &&
        games.map((game: Game, i: number) => (
          <div key={i}>
            <GameCard
              title={game.title}
              price={game.price}
              creator={game.creator}
              description={game.description}
              fsk={game.fsk}
              platform={game.platform}
              year={game.year}
              image={game.image}
              genre={game.genre}
              amount={game.amount}
              gameId={game.gameId}
            />
          </div>
        ))}
    </div>
  );
};

export default Home;
