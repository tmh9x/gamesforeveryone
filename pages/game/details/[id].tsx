import { doc, getDoc } from "firebase/firestore";

import GameDetails from "../../../components/GameDetails";
import type { NextPage } from "next";
import React from "react";
import { db } from "../../../firebase/config";

const Details = ({ gameProp }: GameProps) => {
  console.log("game: ", gameProp);
  const game: Game = gameProp ? JSON.parse(gameProp) : null;
  console.log("GAME : ", game);
  return <div>{game && <GameDetails game={game} />}</div>;
};

export async function getServerSideProps({ params }: Params) {
  // export async function getServerSideProps( {params}: {} ) {
  console.log("params: ", params);
  const docRef = doc(db, "games", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const newGame = {
      ...docSnap.data(),
      gameId: docSnap.id,
    };
    const gameProp = JSON.stringify(newGame);
    console.log("gameJson: ", gameProp);
    console.log("Document data:", docSnap.data());
    return { props: { gameProp } };
  } else {
    console.log("No such document!");
    return { props: { gameProp: null } };
  }
}

export default Details;
