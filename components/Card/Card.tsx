import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { Typography } from "@mui/material";
import { db } from "../../firebase/config";
import styles from "./Card.module.css";

export default function GameCard() {
  console.log("db", db);

  const getGames = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "games"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }} className={styles.card}>
      <CardHeader title="PLATFORM" className={styles.card_header} />
      <Link href="/game/details">
        <CardMedia
          component="img"
          height="200"
          image="/images/defaultImageGame.jpeg"
          alt="game image"
        />
      </Link>
      <div className={styles.card_content}>
        <div>
          <Typography variant="h5">GAMENAME</Typography>
          <Typography paragraph>PRICE</Typography>
        </div>
        <div>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}
