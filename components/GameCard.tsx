import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { Typography } from "@mui/material";
import { db } from "../firebase/config";
import styles from "../styles/Card.module.css";
import { useAuth } from "../context/AuthContext";

export default function GameCard(game: Game) {
  const [like, setLike] = useState(true);

  const { user, getDBUsers, dbUsers } = useAuth();
  console.log("user", user);
  console.log("dbUsers", dbUsers);

  const handleLike = async () => {
    setLike(!like);
    console.log("like", like);
    console.log("game.gameId", game.gameId);

    const userRef = doc(db, "users", dbUsers.id);

    if (like == true) {
      await updateDoc(userRef, {
        liked: arrayUnion(game.gameId),
      });
    } else {
      await updateDoc(userRef, {
        liked: arrayRemove(game.gameId),
      });
    }
  };

  useEffect(() => {
    getDBUsers();
  }, []);

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
        <div>
          <IconButton onClick={handleLike}>
            {dbUsers && dbUsers.liked.includes(game.gameId) ? (
              <FavoriteOutlinedIcon color="error" />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
}
