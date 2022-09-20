import Carousel from "../components/Carousel/Carousel";
import GameCard from "../components/Card/Card";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <GameCard />
    </div>
  );
};

export default Home;
