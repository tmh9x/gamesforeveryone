import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import Image from "next/image";
import LikeButton from "./buttons/LikeButton";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const styled = {
  card: {
    border: "1px solid black",
    display: "flex",
  },
};

function WatchList() {
  const { getDBUsers, dbUsers, getGames, games } = useAuth();

  console.log("dbUsers: ", dbUsers);
  console.log("games", games);

  useEffect(() => {
    getDBUsers();
    getGames();
  }, []);

  return (
    <div>
      {games &&
        games.map(
          (game: Game) =>
            dbUsers.liked.includes(game.gameId) && (
              <Card
                sx={{
                  display: "flex",
                  height: 132,
                  padding: "0",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                  }}
                >
                  <Link
                    href={`/game/details/[id]`}
                    as={`/game/details/${game.gameId}`}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 132, height: 132, objectFit: "cover" }}
                      image={game.image}
                      alt="Live from space album cover"
                    />
                  </Link>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "0",
                    }}
                  >
                    <Container sx={{ height: 25, padding: 0 }}>
                      <Typography sx={{ textAlign: "end" }}>
                        <span
                          style={{
                            backgroundColor: "#303030",
                            borderRadius: "5px 0 0 5px",
                            color: "#fff",
                            padding: "0.3em",
                          }}
                        >
                          {game.platform}
                        </span>
                      </Typography>
                    </Container>

                    <Container sx={{ height: 60 }}>
                      <Link
                        href={`/game/details/[id]`}
                        as={`/game/details/${game.gameId}`}
                      >
                        <Typography variant="h6">{game.title}</Typography>
                      </Link>
                      <Typography>{game.genre}</Typography>
                    </Container>

                    {dbUsers && (
                      <Container
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          $ {game.price}
                        </Typography>
                        <LikeButton gameId={game.gameId} />
                      </Container>
                    )}
                  </CardContent>
                </Box>
              </Card>
            )
        )}
    </div>
  );
}

export default WatchList;
