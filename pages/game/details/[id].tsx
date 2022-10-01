import { doc, getDoc, } from "firebase/firestore";

import GameDetails from "../../../components/GameDetails";
import type { NextPage } from "next";
import React from "react";
import { db } from "../../../firebase/config";

const Details = (game) => {
  const gme: Game = game ? JSON.parse(game.game) : null;
  console.log("GAME : ", gme);
  return (
    <div>
      <GameDetails game={gme} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // export async function getServerSideProps( {params}: {} ) {
  console.log("params: ", params);
  const docRef = doc(db, "games", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const newGame = {
      ...docSnap.data(),
      gameId: docSnap.id,
    };
    const game = JSON.stringify(newGame);
    console.log("Document data:", docSnap.data());
    return { props: { game } };
  } else {
    console.log("No such document!");
    return { props: {} };
  }
}

export default Details;
