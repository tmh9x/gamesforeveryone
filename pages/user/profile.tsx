import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { deleteUser, getAuth } from "firebase/auth";

import AlertDialogSlide from "../../components/alerts/AlertDialogSlide";
import { Button } from "@mui/material";
import { db } from "../../firebase/config";
import swr from "swr";
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
  const { setOpenAlert, delUser } = useAuth();
  // const [games, setGames] = useState<{}>({});
  // const [games, setGames] = useState<any>(null);

  const openDeleteAlert = () => {
    setOpenAlert(true);
  };

  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log("auth.currentUser: ", auth.currentUser);

  // console.log("games: ", games);
  console.log("user: ", user);
  return (
    <>
      <Button onClick={openDeleteAlert}>Delete User</Button>
      <br />
      <Button href="/user/edit-user">Edit Profile</Button>
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
      {/* { value && value.docs.map((game: any, i: number) => {
          console.log("game: ", JSON.stringify(doc.data()));
          return (
            <div key={i} style={{ border: "solid 1px green", margin: "10px" }}>
              <p>{game.title}</p>
              <li>{game.genre}</li>
              <li>{game.platform}</li>
              <li>{game.fsk}</li>
              <li>{game.title}</li>
              <li>{game.title}</li>
              <li>{game.title}</li>
              <li>{game.title}</li>
            </div>
          );
        })} */}

      <div>
        <div>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span> Loading...</span>}
          <span>
            Profile data:{" "}
            {value?.docs.map((doc) =>
              doc.data().authId === auth?.currentUser?.uid ? (
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
              ) : (
                "hallo"
              )
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

/* 
data &&
        data.map((game: any, i: number) => {
          return (
            <div key={i} style={{ border: "solid 1px green", margin: "10px" }}>
              <p>{game.title}</p>
              <li>{game.genre}</li>
              <li>{game.platform}</li>
              <li>{game.fsk}</li>
              <li>{game.title}</li>
              <li>{game.title}</li>
              <li>{game.title}</li>
              <li>{game.title}</li>
            </div>
          );
        })
        
 const getGames = async () => {
    const q = await query(collection(db, "games"));
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
      const games: {}[] = [];
      querySnapshot.forEach((doc) => {
        console.log("doc: ", doc);
        games.push(doc.data());
        // setGames({ ...doc.data(), id: doc.id });
      });
      setGames(games);
    });
  };
  useEffect(() => {
    getGames();
  }, []); */
