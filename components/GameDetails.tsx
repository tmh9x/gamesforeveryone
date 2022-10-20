import { Box, Button, Container, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import SnackbarMui from "./alerts/SnackbarMui";
import { useAuth } from "../context/AuthContext";

// Add attributes to HTML element in TypeScript
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    rel?: string;
    width?: string;
  }
}

const GameDetails = ({ game }: any) => {
  const { dbUserId, user, dbUsers, alerTxt1 } = useAuth();
  const noImage =
    "https://eingleses.com/wp-content/uploads/2019/07/no-image.jpg";

  const handleMessageGame = () => {
    localStorage.setItem("gameId", game.gameId);
    localStorage.setItem("sellerId", game.userId);
    localStorage.setItem("sellerEmail", game.sellerEmail);
  };

  console.log("dbUserId: ", dbUserId);
  console.log("game: ", game);
  console.log("dbUsers: ", dbUsers);
  return (
    <>
      {game ? (
        <Container
          className="game-details-con"
          sx={{
            padding: "0.8em",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            margin: "0 auto",
            maxWidth: "800px",
          }}
        >
          <Image
            src={game.image ? game.image : noImage}
            alt=""
            width="300px"
            height="400px"
          />

          <Box sx={{ width: "70%", margin: "0 auto" }}>
            <Typography variant="h6">{game.title}</Typography>

            <Typography paragraph color="text.secondary">
              {game.description
                ? game.description
                : " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, alias mollitia earum molestias corporis nobis adipisci suscipitsaepe culpa vero esse reiciendis debitis incidunt delectus sunt ducimus praesentium porro vitae."}
            </Typography>

            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography paragraph>Genre:</Typography>
                <Typography paragraph>Creator:</Typography>
                <Typography paragraph>Platform:</Typography>
                <Typography paragraph>Year:</Typography>
                <Typography paragraph>FSK:</Typography>
              </Box>
              <Box>
                <Typography paragraph>
                  {game.genre.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </Typography>
                <Typography paragraph>{game.creator}</Typography>
                <Typography paragraph>{game.platform}</Typography>
                <Typography paragraph>{game.year}</Typography>
                <Typography paragraph>{game.fsk}</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      ) : (
        <h3>Failed!!!</h3>
      )}

      <hr
        data-size="1"
        width="100%"
        style={{ color: "grey", marginBottom: "3rem" }}
      />
      <Container
        className="contact_con"
        style={{ position: "fixed", bottom: "3px", width: "95%" }}
      >
        {game.userId !== user.uid ? (
          <div
            className="contact_box"
            style={{ display: "flex", margin: "auto", width: "90%" }}
          >
            {game && game.sellerPhone && (
              <Button
                className="call_btn"
                style={{ marginRight: "10px" }}
                variant="contained"
                fullWidth
              >
                Call
              </Button>
            )}
            <Link
              href="/game/send-message/[id]"
              as={`/game/send-message/${game.gameId}`}
            >
              <Button
                className="message_btn"
                variant="contained"
                fullWidth
                onClick={handleMessageGame}
              >
                Message
              </Button>
            </Link>
          </div>
        ) : (
          <div className="edit-btn">
            <Link href="/game/edit/[id]" as={`/game/edit/${game.gameId}`}>
              <Button
                href="game/edit"
                className="message_btn"
                variant="contained"
                fullWidth
              >
                Edit Game
              </Button>
            </Link>
          </div>
        )}
      </Container>
      <SnackbarMui text={alerTxt1} />
    </>
  );
};

export default GameDetails;
