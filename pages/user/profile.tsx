import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { deleteUser, getAuth } from "firebase/auth";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import { Button } from "@mui/material";
import Link from "next/link";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useCollection } from "react-firebase-hooks/firestore";

// const fetcher = async () => {
//   const data: {}[] = [];
//   const q = query(collection(db, "games"));
//   const unsubscribe = await onSnapshot(q, (querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       // console.log("doc: ", doc);
//       data.push(doc.data());
//       // setGames({ ...doc.data(), id: doc.id });
//     });
//     // setGames(games);
//   });
//   console.log("data: ", data);

//   return data;
// };

const Dashboard = () => {
  const auth = getAuth();
  const user: any = auth.currentUser;
  const { setOpenAlert, delUser, delGame } = useAuth();
  const [games, setGames] = useState<{}>({});
  // const [games, setGames] = useState<any>(null);

  const openDeleteAlert = () => {
    setOpenAlert(true);
  };

  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // ----------- Get Gamses data -------------- starts
  const [gamesData, gamesDataLoading, gamesDataError] = useCollection(
    collection(db, "games"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  // ----------- Get Gamses data -------------- ends

  const deleteGame = (id: any) => {
    console.log("id", id);
    delGame(id);
  };

  // console.log("games: ", games);
  console.log(
    "value: ",
    value?.docs.map((doc) => doc.data())
  );
  // console.log("auth.currentUser: ", auth.currentUser);
  // console.log(
  //   "games: ",
  //   gamesData?.docs.map((doc) => doc.data())
  // );
 

  console.log("user: ", user);
  return (
    <>
      <Button onClick={openDeleteAlert}>Delete User</Button>
      <br />
      <Button href="/user/edit-user">Edit Profile</Button>
      <br />
      <Button href="/game/edit">Edit Game</Button>

      <AlertDialogSlide
        text1={"Are you sure?"}
        dialogTitle={"Delete User"}
        buttonTxt1={"cancel"}
        buttonTxt2={"delete"}
        buttonVariant1={"outlined"}
        buttonVariant2={"outlined"}
        buttonColor1={"success"}
        buttonColor2={"error"}
        allowFunction={delUser}
        // rejectFunction={}
      />

      <div>
        <>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span> Loading...</span>}
          <span>
            Profile data:{" "}
            {value?.docs.map((doc) => {
              return (
                doc.data().authId === auth?.currentUser?.uid && (
                  <div key={doc.id}>
                    <h2>{doc.data()?.first_name}</h2>
                    <h2>{doc.data()?.last_name}</h2>
                    <h2>{doc.data()?.gender}</h2>
                    <h2>{doc.data()?.street}</h2>
                    <h2>{doc.data()?.postcode}</h2>
                    <h2>{doc.data()?.city}</h2>
                    <h2>{doc.data()?.email}</h2>
                    <h2>{doc.data()?.phone}</h2>
                    <h2>{doc.data()?.birthday}</h2>
                  </div>
                )
              );
            })}
          </span>
        </>
      </div>
    </>
  );
};

export default Dashboard;
