import { Container, Typography } from "@mui/material";

import Image from "next/image";
import React from "react";

const GameDetails = ({ game }: any) => {
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
                {game.genre.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
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
