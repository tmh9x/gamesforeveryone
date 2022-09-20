import Image from "next/image";
import React from "react";
import { Typography } from "@mui/material";
import styles from "./GameDetails.module.css";

const GameDetails = () => {
  return (
    <div className={styles.gameDetails_container}>
      <Image
        src="/images/defaultImageGame.jpeg"
        alt=""
        width="300px"
        height="400px"
      />

      <Typography paragraph>Title:</Typography>

      <Typography paragraph color="text.secondary">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, alias
        mollitia earum molestias corporis nobis adipisci suscipit saepe culpa
        vero esse reiciendis debitis incidunt delectus sunt ducimus praesentium
        porro vitae.
      </Typography>

      <div className={styles.gameDetails_container_text}>
        <div>
          <Typography paragraph>Genre:</Typography>
          <Typography paragraph>Genre:</Typography>
        </div>
        <div>
          <Typography paragraph>Creator:</Typography>
          <Typography paragraph>Creator:</Typography>
        </div>
        <div>
          <Typography paragraph>Year:</Typography>
          <Typography paragraph>Year:</Typography>
        </div>
        <div>
          <Typography paragraph>Amount:</Typography>
          <Typography paragraph>Amount:</Typography>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
