import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import LikeButton from "./buttons/LikeButton";
import Link from "next/link";
import { Typography } from "@mui/material";
import { db } from "../firebase/config";
import styles from "../styles/Card.module.css";
import { useAuth } from "../context/AuthContext";

export default function GameCard(game: Game) {
  const { user, getDBUsers, dbUsers } = useAuth();
  console.log("user", user);
  console.log("dbUsers", dbUsers);

  // useEffect(() => {
  //   getDBUsers();
  // }, []);

  return (
    <Card sx={{ maxWidth: 345 }} className={styles.card}>
      <CardHeader title={game.platform} className={styles.card_header} />
      <Link href={`/game/details/[id]`} as={`/game/details/${game.gameId}`}>
        <CardMedia
          component="img"
          height="200"
          image={game.image}
          alt="game image"
        />
      </Link>
      <div className={styles.card_content}>
        <div>
          <Typography variant="h5">{game.title}</Typography>
          <Typography paragraph>${game.price}</Typography>
        </div>
        <div>{dbUsers && <LikeButton gameId={game.gameId} />}</div>
      </div>
    </Card>
  );
}
