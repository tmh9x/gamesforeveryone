import React, { useEffect } from "react";

import Image from "next/image";
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
              <div style={styled.card} key={game.gameId}>
                <div>
                  <Image src={game.image} alt="" width="130px" height="130px" />
                </div>
                <div>
                  <h3>{game.title}</h3>
                  <p>{game.price}</p>
                </div>
              </div>
            )
        )}
    </div>
  );
}

export default WatchList;
