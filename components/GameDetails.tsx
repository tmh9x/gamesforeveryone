import { Button, Container, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/GameDetails.module.css";
import { useAuth } from "../context/AuthContext";
import { userAgent } from "next/server";

// Add attributes to HTML element in TypeScript
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    rel?: string;
    width?: string;
  }
}

const GameDetails = ({ game }: any) => {
  const { dbUserId, user } = useAuth();
  const sellerId = localStorage.getItem("sellerId");

  const handleMessageGame = () => {
    localStorage.setItem("gameId", game.gameId);
    localStorage.setItem("sellerId", game.userId);
  };
  console.log("dbUserId: ", dbUserId);
  console.log("game: ", game);

  return (
    <>
      {game ? (
        <Container
          sx={{
            padding: "0.8em",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            margin: "0 auto",
            maxWidth: "800px",
          }}
        >
          <Image src={game.image} alt="" width="300px" height="400px" />

          <Typography paragraph>{game.title}</Typography>

          <Typography paragraph color="text.secondary">
            {game.description
              ? game.description
              : " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, alias mollitia earum molestias corporis nobis adipisci suscipitsaepe culpa vero esse reiciendis debitis incidunt delectus sunt ducimus praesentium porro vitae."}
          </Typography>

          <Container>
            <Container sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography paragraph>Genre:</Typography>
              <Typography paragraph>
                {game.genre &&
                  game.genre.map((item: string) => <li key={item}>{item}</li>)}
              </Typography>
            </Container>
            <Container sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography paragraph>Creator:</Typography>
              <Typography paragraph>{game.creator}</Typography>
            </Container>
            <Container sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography paragraph>Plattform:</Typography>
              <Typography paragraph>{game.platform}</Typography>
            </Container>
            <Container sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography paragraph>Year:</Typography>
              <Typography paragraph>{game.year}</Typography>
            </Container>
            <Container sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography paragraph>FSK:</Typography>
              <Typography paragraph>{game.fsk}</Typography>
            </Container>
          </Container>
        </Container>
      ) : (
        <h3>Failed!!!</h3>
      )}
    </>
  );
};

export default GameDetails;
