import { Container, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import LikeButton from "./buttons/LikeButton";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function GameCard(game: Game) {
  const { dbUsers, dbUserId } = useAuth();
  console.log("dbUserId: ", dbUserId);

  return (
    <Card sx={{ maxWidth: 345, marginTop: "2em" }}>
      <CardHeader
        title={game.platform}
        sx={{ backgroundColor: "#e63946", color: "white" }}
      />
      <Link href={`/game/details/[id]`} as={`/game/details/${game.gameId}`}>
        <CardMedia
          component="img"
          height="200"
          image={game.image}
          alt="game image"
        />
      </Link>
      <Container
        sx={{
          padding: "1em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Container>
          <Typography variant="h5">{game.title}</Typography>
          <Typography paragraph>${game.price}</Typography>
        </Container>
        <Container>{dbUsers && <LikeButton gameId={game.gameId} />}</Container>
      </Container>
    </Card>
  );
}
