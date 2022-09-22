<<<<<<< HEAD
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import Carousel from "../components/Carousel/Carousel";
import GameCard from "../components/GameCard/GameCard";
=======
import Carousel from "../components/Carousel";
import GameCard from "../components/Card";
>>>>>>> main
import type { NextPage } from "next";
import { db } from "../firebase/config";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  console.log("db", db);
  const [games, setGames] = useState<Games>([]);

  const getGames = async () => {
    let dataArray: Games = [];

    try {
      const querySnapshot = await getDocs(collection(db, "games"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log("DATA", doc.data());
        const gamesData = doc.data() as Game;
        dataArray.push(gamesData);
        setGames(dataArray);
      });
    } catch (error) {
      console.log("error getgames", error);
    }
    console.log("dataArray", dataArray);
  };

  useEffect(() => {
    getGames();
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
            />
          </div>
        ))}
    </div>
  );
};

export default Home;
