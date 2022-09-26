import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import React from "react";
import { db } from "../../firebase/config";

const GameDetails = (game) => {

  const parseIt = JSON.parse(game.game);
  console.log("GAME : ", parseIt);
  return <div>GameDetails</div>;
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

export default GameDetails;
