import Image from "next/image";
import React from "react";
import { Typography } from "@mui/material";
import styles from "../styles/GameDetails.module.css";

const GameDetails = ({ game }: any) => {
  console.log("game: ", game);
  return (
    <>
      {game ? (
        <div className={styles.gameDetails_container}>
          <Image
            src="/images/defaultImageGame.jpeg"
            alt=""
            width="300px"
            height="400px"
          />

          <Typography paragraph>{game.title}</Typography>

          <Typography paragraph color="text.secondary">
            {game.description
              ? game.description
              : " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, alias mollitia earum molestias corporis nobis adipisci suscipitsaepe culpa vero esse reiciendis debitis incidunt delectus sunt ducimus praesentium porro vitae."}
          </Typography>

          <div className={styles.gameDetails_container_text}>
            <div>
              <Typography paragraph>Genre:</Typography>
              <Typography paragraph>
                {game.genre.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </Typography>
            </div>
            <div>
              <Typography paragraph>Creator:</Typography>
              <Typography paragraph>{game.creator}</Typography>
            </div>
            <div>
              <Typography paragraph>Plattform:</Typography>
              <Typography paragraph>{game.platform}</Typography>
            </div>
            <div>
              <Typography paragraph>Year:</Typography>
              <Typography paragraph>{game.year}</Typography>
            </div>
            <div>
              <Typography paragraph>FSK:</Typography>
              <Typography paragraph>{game.fsk}</Typography>
            </div>
          </div>
        </div>
      ) : (
        <h3>Failed!!!</h3>
      )}
    </>
  );
};

export default GameDetails;
