import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { Typography } from "@mui/material";
import styles from "../styles/Card.module.css";
import { useAuth } from "../context/AuthContext";

export default function GameCard(game: Game) {
 const { dbUsers, getDBUsers, user, dbUserId } = useAuth();
 console.log("dbUserId: ", dbUserId);
 
  return (
    <Card sx={{ maxWidth: 345 }} className={styles.card}>
      <CardHeader title="PLATFORM" className={styles.card_header} />
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}
