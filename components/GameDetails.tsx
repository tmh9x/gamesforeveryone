import { Button, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
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
        <div className={styles.gameDetails_container}>
          <Image
            // src="/images/defaultImageGame.jpeg"
            src={game?.img ? game?.img : game.image}
            alt=""
            width="300px"
            height="400px"
          />

          <Typography paragraph>{game.title}</Typography>

          <Typography paragraph color="text.secondary">
            {game.description
              ? game.description
              : " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, alias mollitia earum molestias corporis nobis adipisci suscipitsaepe culpa vero esse reiciendis debitis incidunt delectus sunt ducimus praesentium porro vitae."}
          </Typography>

          <div className={styles.gameDetails_container_text}>
            <div>
              <Typography paragraph>Genre:</Typography>
              <Typography paragraph>
                {game.genre.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </Typography>
            </div>
            <div>
              <Typography paragraph>Creator:</Typography>
              <Typography paragraph>{game.creator}</Typography>
            </div>
            <div>
              <Typography paragraph>Plattform:</Typography>
              <Typography paragraph>{game.platform}</Typography>
            </div>
            <div>
              <Typography paragraph>Year:</Typography>
              <Typography paragraph>{game.year}</Typography>
            </div>
            <div>
              <Typography paragraph>FSK:</Typography>
              <Typography paragraph>{game.fsk}</Typography>
            </div>
          </div>
          <hr data-size="1" width="100%" color="red" />
          <div
            className={styles.contact_con}
            // style={{ position: "fixed", bottom: "3px", width: "95%" }}
          >
            {game.userId !== user.uid ? (
              <div
                className={styles.contact_box}
                style={{ display: "flex", margin: "auto", width: "90%" }}
              >
                <Button
                  className={styles.call_btn}
                  // style={{ marginRight: "10px" }}
                  variant="contained"
                  fullWidth
                >
                  Call
                </Button>
                <Link href="/user/chat/[id]" as={`/user/chat/${game.gameId}`}>
               
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
                <Button
                  href="game/edit"
                  className="message_btn"
                  variant="contained"
                  fullWidth
                >
                  Edit Game
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h3>Failed!!!</h3>
      )}
    </>
  );
};

export default GameDetails;
